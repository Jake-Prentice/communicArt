import React, { useState } from 'react'
import { useChats } from 'contexts/ChatContext';
import { ChatItem, Chats, CreateNewChatButton, Wrapper } from './style';
import * as faSolid from "@styled-icons/fa-solid";
import { Margin } from 'components/shared/spacing';
import CreateNewChatModal from 'components/CreateNewChatModal';

const ChatSideBar = () => {
    

    const chats = useChats();


    return (
        <Wrapper>
            <h3>My Chats</h3>
            <Chats>
                {chats?.chats.map(chat => (
                    <ChatItem 
                        onClick={() => chats?.setCurrentChat({id: chat._id, messages: []})}
                        isSelected={chat._id === chats?.currentChat?.id}
                    >
                        {chat.numOfNewMessages !== 0 && (
                            <div>new message</div>
                        )}
                        name: {chat._id}
                    </ChatItem>
                ))}
            </Chats>
            <CreateNewChatButton> 
                Create new Chat
                <Margin left={"1rem"} />
                <faSolid.PlusSquare size={"1.2rem"}/>
            </CreateNewChatButton>
          
        </Wrapper>
    )
}

export default ChatSideBar;



