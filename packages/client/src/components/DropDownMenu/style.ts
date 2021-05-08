import Button from "components/shared/Button";
import styled from "styled-components";

export const DefaultMenuItem = styled(Button)`
    width: 100%;
    display: flex;
    padding: 1rem 1rem;
    justify-content: flex-start;
    align-items: center;
    background: white;
    transition: filter 0.2s ease;
    :hover {
        filter: brightness(0.9);
    }
`


export const DefaultMenuWrapper = styled.div`
    position: absolute;
    background: white;
    box-shadow: 0 0 15px rgba(0,0,0, 0.2);
    right: 0;
    margin-top: 30px;
    border-radius: 10px; 
    z-index: 2;
    width: 200px;
    overflow: hidden;
    border: 4px solid #AF99FF;
`
