import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/shared/Button";
import styled from "styled-components";
import * as faSolid from "@styled-icons/fa-solid";

export const Wrapper = styled.header`
    min-height: 50px;
    background: ${props => props.theme.navBar.background};
    box-shadow: 0 0 5px 2px rgb(0 0 0 / 15%);
    display: flex;
    align-items: center;
    padding: 0.7rem 1.7rem;
    position: fixed;
    width: 100%;
    z-index: 3;
    /* border-left: 10px solid purple; */
`

export const Nav = styled.ul`
    display: flex;
    height: 100%;

    ul {
        margin-right: 30px;
    }

    ul:last-child {
        margin-right: 0;
    }
`

export const NavItem = styled(Button)`
    background: inherit;
    border-radius: 3px;
    :hover {
        box-shadow: 0 0 0 1px rgba(255,255,255,0.5);
    }
`

export const Logo = styled(Button)`
    background: inherit;
    font-size: 1.2rem;
    font-weight: bold;
    color: #D81E5B;
`

export const UserCircleButton = styled(Button)`
    box-shadow: inset 0 0 10px rgba(0,0,0, .1);
    padding: 0.55rem 0.5rem;
    border-radius: 0.7em;
    background: white;
    transition: filter 0.2s ease;
    :hover {
        filter: brightness(0.95);
    }
`
