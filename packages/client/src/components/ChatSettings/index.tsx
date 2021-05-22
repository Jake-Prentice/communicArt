import React from 'react'
import { useChats } from 'contexts/ChatContext';
import { EditChatNameWrapper, EditOptions, HeaderWrapper, Wrapper } from './style';

const ChatSettings = () => {
    const chats = useChats();
    return (
        <Wrapper>
            <HeaderWrapper>
                <h3>Settings</h3>
            </HeaderWrapper>
            <EditOptions>
                <EditChatNameWrapper>
                    Chat Name: 
                </EditChatNameWrapper>
            </EditOptions>
        </Wrapper>
    )
}

export default ChatSettings;
