import React, {useState, useEffect, useRef} from "react";
import ChatSideBar from "components/ChatsSidebar";
import CurrentChat from "components/CurrentChat";
import { useChats } from "contexts/ChatContext";
import { ChatLayout, ChatsWrapper } from "./style";
import {Route} from "react-router-dom";

const Chats = () => {
    const chats = useChats();
    return (
        <ChatLayout>
            <ChatsWrapper>
                <ChatSideBar />
                {/* {chats?.currentChat && <CurrentChat />} */}
                <Route path={"/chats/:id"} component={CurrentChat}/>
            </ChatsWrapper>
        </ChatLayout>
    )
}

export default Chats;