import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getChatMessagesById, getChats } from "api/chats";
import {IChatSchema, IMessageSchema, ISendMessageRes} from "@communicArt/common/src/types/schemas";
import useSessionStorage from 'hooks/useSessionStorage';

const ChatContext = React.createContext<IValue | undefined>(undefined);

export function useChats() {
    return useContext(ChatContext);
}


//should I do this, idk?
type IChats = ( Pick<IChatSchema, "name" | "_id"> & {numOfNewMessages: number})[];
type IMessage = Pick<IMessageSchema, "from" | "image">;

export interface ICurrentChat {
    id: string;
    messages: IMessage[];
}

interface IValue {
    chats: IChats;
    setChats: React.Dispatch<React.SetStateAction<IChats>>;
    clearChats: () => void;
    currentChat: ICurrentChat;
    setCurrentChat: React.Dispatch<React.SetStateAction<ICurrentChat>>;
    clearCurrentChat: () => void;
    isDrawCanvasOpen: boolean;
    setIsDrawCanvasOpen: React.Dispatch<React.SetStateAction<boolean>>;
    sendImageMesssage: ({ image, userId}: { image: string, userId: string}) => void;
}


export function ChatProvider({socket, children}: React.PropsWithChildren<{socket: SocketIOClient.Socket}>) { 

    const [chats, setChats, clearChats] = useSessionStorage<IChats>("chats", []);
    const [currentChat, setCurrentChat, clearCurrentChat] = useSessionStorage<ICurrentChat>("currentChat");
    const [isDrawCanvasOpen, setIsDrawCanvasOpen] = useState(false);

    console.log("type", typeof clearChats)
    //get chats
    useEffect(() => {
        if (chats.length !== 0) return;
        (async () => {
            try { 
                const res = await getChats();
                if (!res.data.chats) return;
                const chats: IChats = res.data.chats.map(chat => {
                    return {...chat, numOfNewMessages: 0}
                })
                setChats(chats);
            }catch(err) {}
        })();
    }, [])


    //get messages for current chat
    useEffect(() => {
        console.log("get messages for current chat")
        if (!currentChat?.id) return;
        (async() => {
            try {
                const res = await getChatMessagesById(currentChat.id);
                if (res.data) setCurrentChat(prev => {
                    return {id: prev.id, messages: res.data}
                });
            }catch(err) {}
        })();
    }, [currentChat?.id])


    const addMessageToCurrentChat = useCallback((data: IMessage) => {
        setCurrentChat(prev => {
            return {...prev, messages: [...prev.messages, data]}
        })
    }, [setCurrentChat]);

    
    //on new message
    useEffect(() => {
        if (!socket) return;

        socket.on("new-message", (newMessage: ISendMessageRes) => {
            
            if (newMessage.meta.isNewChat) {
                return;
            }

            if (newMessage.meta.chatId === currentChat?.id) {
                addMessageToCurrentChat(newMessage.data);
                return;
            } 

            setChats(prev => prev.map(chat => {
                console.log("chatid: ", chat._id);
                console.log("newMessage: ", newMessage.meta.chatId)
                return chat._id === newMessage.meta.chatId 
                    ? chat 
                    : {...chat, numOfNewMessages: chat.numOfNewMessages + 1}
            }))


        })

        return () => {socket.off("new-message")};

    }, [socket, currentChat?.id, addMessageToCurrentChat, setChats])


    const sendImageMesssage = ({image, userId}: {image: string, userId: string}) => {
        socket.emit("send-message", {image, chatId: currentChat.id})
        addMessageToCurrentChat({from: userId, image})
    }
    
    const value = {
        chats,
        setChats,
        clearChats,
        currentChat,
        setCurrentChat,
        clearCurrentChat,
        setIsDrawCanvasOpen,
        isDrawCanvasOpen,
        sendImageMesssage
    }
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}