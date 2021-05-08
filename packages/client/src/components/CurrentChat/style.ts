import { Pallet } from "@styled-icons/fa-solid";
import Button from "components/shared/Button";
import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`

export const ImageMessage = styled.img`
    border: 2px solid black;
    border-radius: 10px;
    width: 200px;
    height: 200px;
    object-fit: cover;
    
`

export const MessageWrapper = styled.div<{isFromMe: boolean}>`
    align-self: ${props => props.isFromMe ? "flex-end" : "flex-start"};
    display: flex;
    flex-direction: column;
    
    transition: transform 0.2s ease;

    :hover {
        transform: scale(1.03);
    }
`

export const Messages = styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 50px 50px;
    flex: 1;

    ${MessageWrapper} {
        margin-bottom: 3rem;

    }

`

export const Header = styled.div`

`

export const Footer = styled.div`
    width: 100%;
    background: white;
    min-height: 40px;
    text-align: center;
    border-top: 5px solid purple;
    padding: 0.7rem 0.5rem;
`

export const NewMessageButton = styled(Button)`
    background: none;
    :hover {
        filter: brightness(0.8);
    }
`