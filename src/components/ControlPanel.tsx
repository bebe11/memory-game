import styled from "styled-components";

const ControlPanelContainer = styled.div`
    height: 4rem;
    max-width: 40rem;
    width: 40rem;
    display: flex;
    padding: 1rem;
    justify-content: space-between;
    gap: 1rem;
    margin: auto;

    .moves {
        color: #EEDBCC;
        background-color: transparent;
        line-height: 2rem;
    }

    button {
        background-color: #4b6992;
        border: none;
        color: white;
        padding: 5px 15px;
        text-align: center;
        display: inline-block;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 1rem;
        transform: scale(1);

        &:hover {
            background-color: #3f5778;
        }

        &:active {
            transform: scale(1.05);
        }
    }
`;

export const ControlPanel = ({move, onClick}) => {

    return (
        <ControlPanelContainer>
            <div className="moves">Moves: {move}</div>
            <button onClick={onClick}>New game</button>
        </ControlPanelContainer>
    )
}
