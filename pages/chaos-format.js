import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import SearchCard from '../components/cardSearch';
import CardTable from '../components/cardTable';
import supabase from '../db/connection';

export default function ChaosFormat() {
    const [cards, setCards] = useState({});
    const [extraDeck, setExtraDeck] = useState({});
    const [mainDeck, setMainDeck] = useState({});

    function generateDeck() {
        let mdPool = mainDeck;
        let edPool = extraDeck;
        let deck = '#created by...';
        let md = '\n#main';
        let ed = '\n#extra';
        // generate deck based off cards
        let cardCount = {init: 1};

        console.log('For debugging purposes...');
        console.log('Main Deck:');
        for (let i = 0; i < 40; i++) { // create main deck
            let random = [Math.floor(Math.random() * mdPool.length)]
            let id = mdPool[random].card_id;

            console.log(mdPool[random].name);

            if (Object.keys(cardCount).includes(id)) {
                cardCount.id += 1;

                if (cardCount.id == 3) {
                    mdPool.splice(random, 1);
                }
            } else {
                cardCount.id = 1;
            }
            md += `\n${id}`;
        }

        console.log('\nExtra Deck:');
        for (let i = 0; i < 15; i++) { // create extra deck
            let random = [Math.floor(Math.random() * edPool.length)];
            let id = edPool[random].card_id;

            console.log(edPool[random].name);

            if (Object.keys(cardCount).includes(id)) {
                cardCount.id += 1;

                if (cardCount.id == 3) {
                    edPool.splice(random, 1);
                }
            } else {
                cardCount.id = 1;
            }

            ed += `\n${id}`
        }

        console.log('\n===IF ANY CARDS ARE MISSING, VERIFY HERE AND THEN REPORT THE MISSING CARDS===\n');

        deck += md + ed + '\n!side';

        let blob = new Blob([deck], {
            type: 'text/pain;charset=utf-8'
        });

        let filename = `chaos deck ${Math.random() * 9999}.txt`;
        saveAs(blob, filename);
    }


    useEffect(() => {
        // get cards from db to build list
        async function getCards() {
            const data = await supabase.from('cards').select('name, type, card_id')
                .then((result) => {
                    setCards(result['data']);

                    // set extra deck cards
                    let ed = [];
                    let md = [];
                    for (let i = 0; i < result['data'].length; ++i) {
                        if (result['data'][i].type.includes('Fusion') || result['data'][i].type.includes('Synchro') || result['data'][i].type.includes('Xyz') || result['data'][i].type.includes('Link')) {
                            ed.push(result['data'][i]);
                        } else {
                            md.push(result['data'][i]);
                        }
                    }
                    setExtraDeck(ed);
                    setMainDeck(md);
                });
        }

        getCards();
    }, [])

    // underneath card search, show returned card and also add some sort of spelling correction
    return (
        <>
            <h1 className="text-center text-2xl">Chaos Format</h1>
            <h1 className="text-center text-md font-light">Card list & Deck Generation</h1>
            <button onClick={generateDeck} className="block mt-4 mb-8 mx-auto bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">Generate Deck</button>
            <div className="grid xl:grid-cols-3 lg:grid-rows justify-center gap-4"> {/* auth for search card otherwise display Only authorized users can add cards */}
                <SearchCard cardList={cards}></SearchCard>
                <CardTable cards={cards}></CardTable>
            </div>
        </>
    )
}