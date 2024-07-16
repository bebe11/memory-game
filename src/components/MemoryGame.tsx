import {useState} from "react";
import {ICard} from "../interfaces/ICard";
import Card from "./Card";

const cards = [
    { value: 1},
    { value: 2},
    { value: 3},
    { value: 4},
    { value: 5},
    { value: 6},
    { value: 7},
    { value: 8},
];

export const cardsData = [...cards, ...cards]
    .sort(() => Math.random() - 0.5)
    .map(card => ({ ...card, id: Math.random(), flipped: false, hidden: false }));

export const MemoryGame = () => {
    let [cards, setCards] = useState<ICard[]>(cardsData);
    let [isLoading, setIsLoading] = useState(false);
    let [firstChoice, setFirstChoice] = useState(null);

    const onChangeCard = (clickedCard: ICard) => {
        clickedCard.flipped = !clickedCard.flipped;
        let newState = [...cards];
        let index = cards.findIndex((card) => card.id === clickedCard.id);
        newState.splice(index, 1, clickedCard);
        setCards(newState);
    }

    const handleClick = (e, card: ICard) => {
        if (isLoading) {
            return;
        }
        if (!firstChoice) {
            setFirstChoice(card);
            onChangeCard(card);
        } else {
            onChangeCard(card);
            checker(card);

        }
    };

    const checker = (clickedCard: ICard) => {
        if (firstChoice.value === clickedCard.value) {
            console.log('találat');
        } else {
            setIsLoading(true);
            setTimeout(()=> {
                onChangeCard(firstChoice);
                onChangeCard(clickedCard);
                setIsLoading(false);
            }, 1500)
        }
        setFirstChoice(null);
    }

    return (
        <div className="memory-game">
            {cards?.map((card) => {
                return (
                    <Card
                        key={card.id}
                        card={card}
                        onClick={(e) => handleClick(e, card)}
                    />
                );
            })}
        </div>
    )
}
