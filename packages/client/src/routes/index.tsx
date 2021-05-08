import React from 'react';
import theme from "components/shared/theme"
import {
  BrowserRouter, 
  Route, 
  Switch, 
  RouteComponentProps
} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./style"
import RedirectAs404 from "./RedirectAs404";
import ProtectedRoute from "components/ProtectedRoute";
import {IUserValue, UserProvider, useUser} from "contexts/UserContext";
//Pages
import Home from "./Home"
import Page404 from "./Page404";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Chats from "./Chats";
import NavBar from 'components/NavBar';
import { ChatProvider } from 'contexts/ChatContext';
import useSocket from 'hooks/useSocket';

interface ILocation {
  is404?: boolean;
}

const ChatsWrapper = ({user}: {user: IUserValue}) => {
    const socket = useSocket({accessToken: user.accessToken})

    if (!socket) return (
        <div>loading...</div>
    )
    return (
        <ChatProvider socket={socket}>
            <Chats /> 
        </ChatProvider>
    )
}


const Routes = ({location}: RouteComponentProps<{}, any, ILocation | any>) => {
    const user = useUser();
    return (
        location.state?.is404 === true
        ? <Page404 />
        : (
            <>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <ProtectedRoute 
                        isAuth={user.isAuth} 
                        authPath={"/login"} 
                        path={"/chats"}
                    >
                        <ChatsWrapper user={user}/>
                    </ProtectedRoute>
                    <RedirectAs404 />
                </Switch> 
            </>
          )
    )
}

const App = () => {
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UserProvider>
          <BrowserRouter>
            <Route component={Routes} />
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
  );
}

export default App;
