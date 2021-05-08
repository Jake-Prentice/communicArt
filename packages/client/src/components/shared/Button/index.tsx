import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
    border: none;
    outline: none;
    padding: 0.5rem 1.2rem;
    cursor: pointer;

    :hover {
        filter: brightness(1.1);
    }
`

interface IDefaultProps {
    children: React.ReactChildren;
    to?: string;
    disabled?: boolean;
    isLoading?: boolean;
}

export function handleLinkWrapping(Component: React.ComponentType<any>, props: IDefaultProps)  {
    const {children, to, disabled, isLoading, ...rest} = props 
    
    const button = (
        <Component disabled={disabled || isLoading} {...rest}>
            {children}
        </Component>
    )

    if (to) return <Link style={{textDecoration: "none"}} to={to} >{button}</Link>

    return button;

}

const Button = (props: React.PropsWithChildren<any>) => handleLinkWrapping(StyledButton, props);
export default Button;