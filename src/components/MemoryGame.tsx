import {useState} from "react";
import {ICard} from "../interfaces/ICard";
import Card from "./Card";
import styled from "styled-components";
import {ControlPanel} from "./ControlPanel";
import useCookie from "../hooks/useCookie";

const MemoryGameContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-content: center;

    .game-table {
        width: 40rem;
        height: 40rem;
        gap: .625rem;
        display: grid;
    }
`;

const createArray = (size: number) => Array.from({length: size}, (_, i) => i + 1)

const cardsData = (size: number) => [...createArray(size), ...createArray(size)]
    .sort(() => Math.random() - 0.5)
    .map(card => ({value: card, id: Math.random(), flipped: false, done: false}));

export const MemoryGame = () => {
    const {
        setCookieCards,
        getCookieCards,
        resetCookieCards,
        getCookieMoves,
        setCookieMoves,
        resetCookieMoves
    } = useCookie();
    const DEFAULT_SIZE = 8;
    const [size, setSize] = useState(DEFAULT_SIZE);
    const [cards, setCards] = useState<ICard[]>(getCookieCards() ?? cardsData(DEFAULT_SIZE));
    const [isLoading, setIsLoading] = useState(false);
    const [firstChoice, setFirstChoice] = useState(null);
    const [moves, setMoves] = useState(getCookieMoves() ?? 0);

    const onChangeFlipped = (clickedCard: ICard) => {
        clickedCard.flipped = !clickedCard.flipped;
        onChangeCard(clickedCard);
    }

    const onChangeDone = (clickedCard: ICard) => {
        clickedCard.done = true;
        onChangeCard(clickedCard);
    }

    const onChangeCard = (clickedCard: ICard) => {
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
            onChangeFlipped(card);
        } else {
            onChangeFlipped(card);
            checker(card);
        }
    };

    const checker = (clickedCard: ICard) => {
        setIsLoading(true);
        setTimeout(() => {
            if (firstChoice.value === clickedCard.value) {
                onChangeDone(firstChoice);
                onChangeDone(clickedCard);
            } else {
                onChangeFlipped(firstChoice);
                onChangeFlipped(clickedCard);
            }
            setIsLoading(false);
            setFirstChoice(null);
            setCookieCards(cards);
            let tempMoves = moves + 1;
            setMoves(tempMoves);
            setCookieMoves(tempMoves);
        }, 1000)
    }

    const newGame = (e) => {
        if (isLoading) {
            return;
        }
        resetCookieCards();
        resetCookieMoves();
        setCards(cardsData(DEFAULT_SIZE));
        setMoves(0);
    }

    return (
        <MemoryGameContainer>
            <ControlPanel onClick={(e) => newGame(e)} move={moves}></ControlPanel>
            <div className="game-table"
                 style={{gridTemplateColumns: `repeat(${Math.round(Math.sqrt(size * 2))}, 1fr)`}}>
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
        </MemoryGameContainer>
    )
}
