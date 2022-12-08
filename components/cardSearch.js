import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../db/connection';

export default function SearchCard({ cardList }) {
    const apiEndpoint = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?';
    const [card, setCard] = useState({});
    const [search, setSearch] = useState('');
    const [allCards, setAllCards] = useState([]);
    const router = useRouter();

    async function cardSearch(e) {
        e.preventDefault();
        fetch(`${apiEndpoint}name=${search}`)
            .then((response) => response.json())
            .then((cardData) => {
                setCard(cardData['data'][0]);
                console.log(cardData['data'][0]);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function updateSearch(event) {
        setSearch(event.target.value);
    }

    async function addCard() {
        let type = '';
        let cardID = card.id;

        if (card.type.includes('Monster')) {
            switch(card.type) {
                case 'Fusion Monster':
                    type = card.type.replace('Fusion Monster', 'Monster/Fusion');
                    break;
                case 'Effect Monster':
                    type = card.type.replace('Effect Monster', 'Monster/Effect');
                    break;
                case 'Normal Monster':
                    type = card.type.replace('Normal Monster', 'Monster');
                    break;
                case 'Normal Tuner Monster':
                    type = card.type.replace('Normal Tuner Monster', 'Monster/Tuner');
                    break;
                case 'Tuner Monster':
                    type = card.type.replace('Tuner Monster', 'Monster/Effect/Tuner');
                    break;
                case 'Ritual Effect Monster':
                    type = card.type.replace('Ritual Effect Monster', 'Monster/Ritual');
                    break;
                case 'Ritual Monster':
                    type = card.type.replace('Ritual Monster', 'Monster/Ritual');
                    break;
                case 'Spirit Monster':
                    type = card.type.replace('Spirit Monster', 'Monster/Spirit');
                    break;
                case 'Flip Effect Monster':
                    type = card.type.replace('Flip Effect Monster', 'Monster/Flip');
                    break;
                case 'Synchro Tuner Monster':
                    type = card.type.replace('Synchro Tuner Monster', 'Monster/Synchro/Tuner');
                    break;
                case 'Synchro Monster':
                    type = card.type.replace('Synchro Monster', 'Monster/Synchro');
                    break;
                case 'XYZ Monster':
                    type = card.type.replace('XYZ Monster', 'Monster/Xyz');
                    break;
                case 'Pendulum Normal Monster':
                    type = card.type.replace('Pendulum Normal Monster', 'Monster/Pendulum');
                    break;
                case 'Pendulum Effect Monster':
                    type = card.type.replace('Pendulum Effect Monster', 'Monster/Effect/Pendulum');
                    break;
                case 'XYZ Pendulum Effect Monster':
                    type = card.type.replace('XYZ Pendulum Effect Monster', 'Monster/XYZ');
                    break;
                case 'Synchro Pendulum Effect Monster':
                    type = card.type.replace('Synchro Pendulum Effect Monster', 'Monster/Synchro');
                    break;
                case 'Link Monster':
                    type = card.type.replace('Link Monster', 'Monster/Link');
                    break;
            }
        } else {
            type = card.type.replace(' Card', '');
        }

        if (card.card_images.length > 1) {
            cardID = card.card_images[1].id
        }

        const { error } = await supabase.from('cards').insert({name: card.name, type: type, card_id: cardID});
        router.reload(window.location.pathname); //temp till find a way to repopulate the page
    }

    async function removeCard() {
        const { error } = await supabase.from('cards').delete().eq('name', card.name);
        router.reload(window.location.pathname); //temp till find a way to repopulate the page
    }

    useEffect(() => {
        function sortCards() {
            let cards = [];
            for (let i = 0; i < cardList.length; ++i) {
                cards.push(cardList[i].name);
            }
            setAllCards(cards);
        }

        sortCards();
    }, [cardList])

    return (
        <div className="block">
            <div className='flex flex-col w-64 justify-center items-start ml-24 bg-gray-700 rounded rounded-border p-4'>
                <h1 className="font-bold text-lg pb-2">Add/Remove Cards</h1>
                <h1 className="text-xl font-medium pb-1">Search card:</h1>
                <input onChange={updateSearch} value={search} type='text' autoFocus className="mb-4 px-2 bg-gray-500" placeholder='Enter a card name...'></input>
                <button onClick={cardSearch} type='button' className="rounded rounded-border bg-gray-500 hover:bg-gray-400 px-2">Search</button>

                {!card.name ? (
                    <></>
                ) : (
                    <div className="mt-8">
                        <img src={card.card_images[0].image_url} alt="card image"></img>

                        {allCards.includes(card.name) ? (
                            <button onClick={removeCard} className="mt-4 bg-red-600 hover:bg-red-500 rounded rounded-border px-2 py-1">Remove card</button>
                        ) : (
                            <button onClick={addCard} className="mt-4 bg-green-600 hover:bg-green-500 rounded rounded-border px-2 py-1">Add card</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}