import DropDownMenu from 'components/DropDownMenu';
import { Margin } from 'components/shared/spacing';
import useUser, {IUserValue} from 'contexts/UserContext';
import React from 'react'
import { Logo, Nav, NavItem, UserCircleButton, Wrapper } from './style';
import * as faSolid from "@styled-icons/fa-solid";
import * as faRegular from "@styled-icons/fa-regular"

const NotLoggedIn = () => (
    <Nav>
        <NavItem to={"/register"}>sign up</NavItem>
        <NavItem to={"/login"}>login</NavItem>
    </Nav>
)

const LoggedIn = (props: {user: IUserValue}) => {

    const Chats = () => (<>
         <faRegular.Comments size={"1.4rem"} />
         <Margin left={"0.6rem"}/> 
         chats 
    </>)

    const Profile = () => (<>
        <faRegular.User size={"1.15rem"}/>
        <Margin left={"0.6rem"}/> 
        profile 
    </>)

    const Logout = () => (<>
        <faSolid.SignOutAlt size={"1.15rem"}/>
        <Margin left={"0.6rem"}/> 
        logout
    </>)

    const menuItems = [
        {children: Chats, to: "/chats"},
        {children: Profile, to: "/profile"},
        {children: Logout, onClick: props.user.logout}
    ]

    const UserDropDown = () => DropDownMenu({
        ControlComponent: props => (
            <UserCircleButton {...props}>
                <faSolid.UserCircle size={"1.6rem"}/>
            </UserCircleButton>
        )
   }, menuItems)

    return <UserDropDown />

}

const NavBar = () => {
    const user = useUser();

    return (
        <Wrapper>
            <Logo to={"/"}>CommunicArt</Logo>
            <Margin auto />
            {user.isAuth ? <LoggedIn user={user}/> : <NotLoggedIn />}
        </Wrapper>
    )
}

export default NavBar;
