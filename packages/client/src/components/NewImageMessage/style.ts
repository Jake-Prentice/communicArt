import Button from "components/shared/Button";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 0 100vh rgba(0,0,0,.5);
    background: white;
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    user-select: none;
`

export const DrawCanvasSettings = styled.div`
    min-height: 70px;
    width: 100%;
    border-top: 2px solid black;
    display: flex;
    padding: 0.6rem 0.8rem;

    & > * {
        flex-basis: 100%;
    }

`

export const StyledCanvas = styled.canvas`
    user-select: none;
    background: white;
`

export const ExitButton = styled(Button)`
    position: absolute;
    top: 0;
    right: 0;
`

export const StyledColorCircle = styled(Button)<{background: string, isSelected: boolean}>`
    border-radius: 50%;
    width: 2rem;
    height: 2.3rem;
    background: ${props => props.background};
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    transition: transform 1s ease;

    ${props => props.isSelected && css`
        transform: scale(1.1);
        box-shadow: 0 0 10px rgba(0,0,0, .5);
    `}
`

export const ColorSettings = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    row-gap: 0.5rem;
`

export const BrushSizeSettings = styled.div`

`

export const SendButton = styled(Button)`
    width: 7em;
    display: flex;
    /* padding: 0.6rem 2rem; */
    transform: translateY(calc(100% + 0.7rem));
    position: absolute;
    bottom: 0;
    right: 1rem;
    font-size: 0.9rem;
    background: blue;
    color: white;
    border-radius: 0.3em;

    :hover {
        filter: brightness(0.8);
    }
`