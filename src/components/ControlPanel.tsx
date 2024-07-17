import styled from "styled-components";

const ControlPanelContainer = styled.div`
    height: 2rem;
    max-width: 40rem;
    width: 40rem;
    display: flex;
    padding: 0 1rem;
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

    .input-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }

    input {
        background-color: #EEDBCC;
        border-radius: 0.5rem;
        padding: 5px 15px;
        border: navajowhite;
        width: 5rem;
    }
`;

export const ControlPanel = ({move, size, onClick, onInputChange}) => {
    const updateInputValue = (e) => {
        onInputChange(e.target.value);
    }

    return (
        <ControlPanelContainer>
            <div className="moves">Moves: {move}</div>
            <div className={"input-container"}>
                <input type="number" value={size} onChange={updateInputValue}/> = {size * 2}
            </div>
            <button onClick={onClick}>New game</button>
        </ControlPanelContainer>
    )
}
