import React from "react";
import {Link, LinkProps} from "react-router-dom";
import styled, {StyledComponentProps} from "styled-components";

const StyledButton = styled.button`
    border: none;
    outline: none;
    padding: 0.5rem 1.2rem;
    cursor: pointer;

    :hover {
        filter: brightness(1.1);
    }
`

type TDefaultProps = {
    disabled?: boolean;
    isLoading?: boolean;
} 
    & React.HTMLProps<HTMLButtonElement>
    & Partial<LinkProps>;


export function handleLinkWrapping(
    Component: React.ComponentType<any>, 
    props: React.PropsWithChildren<TDefaultProps>
)  {
    const {children, to, disabled, isLoading, ...rest} = props 
    
    const button = (
        <Component disabled={disabled || isLoading} {...rest}>
            {children}
        </Component>
    )

    if (to) return <Link style={{textDecoration: "none"}} to={to} >{button}</Link>

    return button;

}

const Button = (props: React.PropsWithChildren<TDefaultProps>) => handleLinkWrapping(StyledButton, props);
export default Button;