import { useEffect, useState } from 'react';

export default function CardTable({ cards }) {
    const [types, setTypes] = useState({
        'Monster/Effect': 'bg-orange-500 text-black',
        'Monster/Flip': 'bg-orange-500 text-black',
        'Monster/Effect/Pendulum': 'bg-orange-500 text-black',
        'Monster/Spirit': 'bg-orange-500 text-black',
        'Monster/Effect/Tuner': 'bg-orange-500 text-black',
        'Monster': 'bg-yellow-300 text-black',
        'Monster/Pendulum': 'bg-yellow-300 text-black',
        'Monster/Tuner': 'bg-yellow-300 text-black',
        'Monster/Fusion': 'bg-purple-600 text-black',
        'Monster/Synchro': 'bg-white text-black',
        'Monster/Synchro/Tuner': 'bg-white text-black',
        'Monster/Xyz': 'bg-black text-white',
        'Monster/Link': 'bg-blue-600 text-black',
        'Monster/Ritual': 'bg-blue-400 text-black',
        'Trap': 'bg-fuchsia-700 text-black',
        'Spell': 'bg-teal-600 text-black'
    });

    const [orderedCards, setOrderedCards] = useState([
        {'Monster': []},
        {'Monster/Tuner': []},
        {'Monster/Pendulum': []},
        {'Monster/Effect': []},
        {'Monster/Flip': []},
        {'Monster/Spirit': []},
        {'Monster/Effect/Tuner': []},
        {'Monster/Effect/Pendulum': []},
        {'Monster/Ritual': []},
        {'Monster/Fusion': []},
        {'Monster/Synchro': []},
        {'Monster/Synchro/Tuner': []},
        {'Monster/Xyz': []},
        {'Monster/Link': []},
        {'Spell': []},
        {'Trap': []}
    ]);

    const [list, setList] = useState([]);

    useEffect(() => {
        async function sortCards() { // order cards by type then alphabetically
            for (let i = 0; i < orderedCards.length; ++i) {
                for (let j = 0; j < cards.length; ++j) {
                    if (cards[j].type == Object.keys(orderedCards[i])) {
                        orderedCards[i][Object.keys(orderedCards[i])].push(cards[j].name);
                    }
                }
                orderedCards[i][Object.keys(orderedCards[i])].sort()
            }

            let officialList = []

            // go through each array and funnel back into a global object
            for (let i = 0; i < orderedCards.length; ++i) { // all types
                for (let j = 0; j < orderedCards[i][Object.keys(orderedCards[i])].length; ++j) { // cards of that type
                    for (let k = 0; k < cards.length; ++k) { // all prop cards
                        if (cards[k].name == orderedCards[i][Object.keys(orderedCards[i])][j]) {
                            officialList.push(cards[k]);
                            break;
                        }
                    }
                }
            }
            setList([...officialList]);
        }

        sortCards();
    }, [cards]);

    return (
        <div className="block">
        {cards[0]?.name ? (
            <table className='table-fixed'>
            <tbody>
                <tr className="bg-gray-200 text-black" align="center">
                    <td className="border-gray-800 border-2 px-1" width="137" height="40">
                        <strong>Card Type</strong>
                    </td>
                    <td className="border-gray-800 border-2 px-1" width="282">
                        <strong>Card Name</strong>
                    </td>
                </tr>
                {list.map((card, index) => (
                    <tr className={`${types[card.type]}`} key={`card ${index}`}>
                        <td className="border-gray-800 border-2 px-1">{card.type}</td>
                        <td className="border-gray-800 border-2 px-1">{card.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        ) : (
            <h1 className="font-thin text-lg text-center">loading table...</h1>
        )}
        </div>
    )
}