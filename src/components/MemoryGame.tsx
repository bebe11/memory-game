import {useEffect, useState} from "react";
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
    position: relative;
    gap: 2rem;

    .game-table {
        width: 40rem;
        height: 40rem;
        gap: .625rem;
        display: grid;
    }

    p {
        color: #EEDBCC;
        font-size: 1.5rem;
        text-align: center;
    }

    .show {
        visibility: visible;
    }

    .hidden {
        visibility: hidden;
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
        getCookieTableSize,
        setCookieMoves,
        resetCookieMoves,
        setCookieTableSize
    } = useCookie();
    const DEFAULT_SIZE = 8;
    const [size, setSize] = useState(getCookieTableSize() ?? DEFAULT_SIZE);
    const [tempSize, setTempSize] = useState(size);
    const [cards, setCards] = useState<ICard[]>(getCookieCards() ?? cardsData(size));
    const [isLoading, setIsLoading] = useState(false);
    const [firstChoice, setFirstChoice] = useState(null);
    const [moves, setMoves] = useState(getCookieMoves() ?? 0);

    useEffect(() => {
        setCookieTableSize(tempSize);
    }, [size]);

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

        if (tempSize < 2 || tempSize > 20) {
            alert('Please enter number between 2 and 20');
            return;
        }
        resetCookieCards();
        resetCookieMoves();
        setCards(cardsData(tempSize));
        setMoves(0);
        setSize(tempSize);
    }

    return (
        <MemoryGameContainer>
            <ControlPanel onClick={(e) => newGame(e)} size={tempSize} move={moves}
                          onInputChange={(e) => setTempSize(e)}></ControlPanel>
            <div className="game-table"
                 style={{gridTemplateColumns: `repeat(${Math.round(Math.sqrt(size * 2))}, minmax(100px, 1fr))`}}>
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
            <p className={`${cards.filter(value => !value.done).length === 0 && size !== 0 ? 'show' : 'hidden'}`}>Congratulations!
                You
                completed the task
                in {moves} steps.</p>
        </MemoryGameContainer>
    )
}
