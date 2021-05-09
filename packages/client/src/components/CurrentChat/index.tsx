import { getChatMessagesById } from 'api/chats';
import useUser from 'contexts/UserContext';
import React, { useEffect, useRef, useState} from 'react'
import { 
    Wrapper,
    Messages,
    ImageMessage, 
    MessageWrapper, 
    Footer, 
    NewMessageButton, 
    SettingsWrapperButton
} from './style';
import * as faSolid from "@styled-icons/fa-solid"
import * as faRegular from "@styled-icons/fa-regular";
import NewImageMessage from 'components/NewImageMessage';
import { useChats } from 'contexts/ChatContext';
import { Margin } from 'components/shared/spacing';
import CreateNewChatModal from 'components/CreateNewChatModal';


const CurrentChat = () => {
    
    const user = useUser();
    const chats = useChats()!;
    const bottomRef = useRef<HTMLDivElement>(null);
    const [chatSettingsIsOpen, setChatSettingsIsOpen] = useState(false);

    
    useEffect(() => {
        bottomRef?.current?.scrollIntoView({behavior: "smooth"})
    }, [chats.currentChat.messages])

    return (
        <>
            <Wrapper>
                <SettingsWrapperButton onClick={() => setChatSettingsIsOpen(true)}>
                    <faSolid.Cog size={"1.2rem"} />
                </SettingsWrapperButton>
                <Messages>
                {chats.currentChat.messages.map((message, index) => {
                        const isFromMe = message.from === user.data.id;
                        return (
                            <MessageWrapper key={index} isFromMe={isFromMe} >
                                <ImageMessage src={message.image} />
                                <Margin bottom={"1rem"} />
                                {isFromMe ? "you" : message.from}
                            </MessageWrapper>
                        )
                })}
                <div ref={bottomRef} />
                </Messages>
                <Footer>
                    <NewMessageButton onClick={() => chats.setIsDrawCanvasOpen(true)}>
                        <faSolid.Palette size={"2.4rem"} />
                    </NewMessageButton>
                </Footer>
            </Wrapper>
            {chats.isDrawCanvasOpen && <NewImageMessage />}
            {chatSettingsIsOpen && <CreateNewChatModal />}
        </>
    )
}

export default CurrentChat;
