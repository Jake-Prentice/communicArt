import React, { useEffect, useRef, useState } from 'react'
import { DefaultMenuItem, DefaultMenuWrapper } from './style';
import useOnClickOutside from "hooks/useOnClickOutside";

interface IProps { 
    ControlComponent: React.ComponentType<any>;
    MenuWrapper?: React.ComponentType<any>;
    MenuItem?: React.ComponentType<any>;
}

interface IMenuItem {
    children: string | (() => JSX.Element); 
    to?: string;
    onClick?: () => void;
}

type TMenuItems = IMenuItem[];

const DropDownMenu = ({
    ControlComponent, 
    MenuWrapper=DefaultMenuWrapper, 
    MenuItem=DefaultMenuItem
}: IProps, 
    menuItems: TMenuItems
) => {

    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef(null);
    useOnClickOutside(ref, () => setIsOpen(false));

    return (
        <div ref={ref} style={{position: "relative"}}>
            <ControlComponent onClick={() => setIsOpen(prev => !prev)} />
            {isOpen && (
                <MenuWrapper>
                    {menuItems.map((menuItem, index) => {
                        const {onClick, children, ...restMenuItem} = menuItem;
                        return (
                            <MenuItem 
                                key={index}
                                onClick={() => {onClick?.(); setIsOpen(false)}}
                                {...restMenuItem} 
                            >
                                {typeof children === "function" 
                                    ? children() 
                                    : children
                                }
                            </MenuItem>
                        )
                    })}
                </MenuWrapper>
            )}
        </div>
    )
}


export default DropDownMenu;