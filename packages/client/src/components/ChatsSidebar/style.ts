import Button from "components/shared/Button";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px 2px rgba(0,0,0,.2);
    padding-top: 2rem;
    min-width: 230px;

    h3 {
        align-self: center;
        margin-bottom: 2rem;
    }
`

export const ChatItem = styled(Button)<{isSelected: boolean;}>`
    padding: 1rem 0.5rem;
    background: white;
    ${props => props.isSelected && css`
        border-left: 7px solid #7F7EFF;
    `}

    :hover {
        filter: brightness(0.8);
    }

    
`

export const Chats = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    ${ChatItem} {
        border-bottom: 2px solid rgba(0,0,0,.2);
    }

    ${ChatItem}:first-child {
        border-top: 2px solid rgba(0,0,0,.2);
    }

`

export const CreateNewChatButton = styled(Button)`
    padding: 1rem 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #D81E5B;
    color: white;
    width: 100%;
`