import React, {useState, useEffect, useRef} from "react";
import ChatSideBar from "components/ChatsSidebar";
import CurrentChat from "components/CurrentChat";
import { useChats } from "contexts/ChatContext";
import { ChatLayout, ChatsWrapper } from "./style";
import {Route} from "react-router-dom";
import ChatSettings from "components/ChatSettings";

const Chats = () => {
    const chats = useChats();
    return (
        <ChatLayout>
            <ChatsWrapper>
                <ChatSideBar />
                <Route exact path={"/chats/:id"} component={CurrentChat}/>
                <Route exact path={"/chats/:id/settings"} component={ChatSettings}/>
            </ChatsWrapper>
        </ChatLayout>
    )
}

export default Chats;