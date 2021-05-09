import React, { useState } from 'react'
import { useChats } from 'contexts/ChatContext';
import { ChatItem, Chats, CreateNewChatButton, Wrapper } from './style';
import * as faSolid from "@styled-icons/fa-solid";
import { Margin } from 'components/shared/spacing';
import CreateNewChatModal from 'components/CreateNewChatModal';
import {useHistory} from "react-router-dom";

const ChatSideBar = () => {
    

    const chats = useChats();
    const history = useHistory();

    const onClickChat = (chatId: string) => {
        chats?.setCurrentChatMessages([]);
        history.push(`/chats/${chatId}`);
    }

    return (
        <Wrapper>
            <h3>My Chats</h3>
            <Chats>
                {chats?.chats.map(chat => (
                    <ChatItem 
                        onClick={() => onClickChat(chat._id)}
                        isSelected={chat._id === chats?.currentChatId}
                    >
                        {chat.numOfNewMessages !== 0 && (
                            <div>new message</div>
                        )}
                        name: {chat._id}
                    </ChatItem>
                ))}
            </Chats>
            <CreateNewChatButton onClick={() => history.push("/chats/new")}> 
                Create new Chat
                <Margin left={"1rem"} />
                <faSolid.PlusSquare size={"1.2rem"}/>
            </CreateNewChatButton>
        </Wrapper>
    )
}

export default ChatSideBar;



