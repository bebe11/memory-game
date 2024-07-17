import styled from "styled-components";
import cardBack from "../assets/images/logo.svg";

const CARD_BACKGROUND = '#4AB4DE';

const CardContainer = styled.div`
    background: ${CARD_BACKGROUND};
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    border-radius: .4rem;
    transform: scale(1);
    transform-style: preserve-3d;
    transition: transform 0.5s;

    &:active {
        transform: scale(0.95);
        transition: transform 0.2s;
    }

    &.done {
        opacity: 0.1;
        transform: none;
    }

    &.flip {
        transform: rotateY(180deg);
    }

    .front,
    .back {
        width: 100%;
        height: 100%;
        padding: 1.25rem;
        position: absolute;
        border-radius: .4rem;
        background: ${CARD_BACKGROUND};
        backface-visibility: hidden;
    }

    .front {
        transform: rotateY(180deg);
        text-align: center;
        vertical-align: middle;
        font-size: 5rem;
        color: #EEDBCC;
    }
`;

export const Card = ({card, onClick}) => {
    return (
        <CardContainer className={card.done ? 'done' : card.flipped ? 'flip' : ''}
                       onClick={() => !card.flipped && onClick()}>
            <div className="front">{card.value}</div>
            <img className="back" src={cardBack} alt="Card back side"/>
        </CardContainer>
    )
}

export default Card;
