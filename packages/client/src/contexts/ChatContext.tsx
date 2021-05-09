import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getChatMessagesById, getChats } from "api/chats";
import {IChatSchema, IMessageSchema, ISendMessageRes} from "@communicArt/common/src/types/schemas";
import useSessionStorage from 'hooks/useSessionStorage';
import {useHistory} from "react-router-dom";

const ChatContext = React.createContext<IValue | undefined>(undefined);

export function useChats() {
    return useContext(ChatContext);
}



//should I do this, idk?
type IChats = ( Pick<IChatSchema, "name" | "_id"> & {numOfNewMessages: number})[];
type IMessage = Pick<IMessageSchema, "from" | "image">;

interface IValue {

    chats: IChats;
    setChats: React.Dispatch<React.SetStateAction<IChats>>;
    clearChats: () => void;

    currentChatId: string;
    setCurrentChatId: React.Dispatch<React.SetStateAction<string>>;  

    currentChatMessages: IMessage[];
    setCurrentChatMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
    clearCurrentChatMessages: () => void;
    
    isDrawCanvasOpen: boolean;
    setIsDrawCanvasOpen: React.Dispatch<React.SetStateAction<boolean>>;

    sendImageMesssage: ({ image, userId}: { image: string, userId: string}) => void;
}


export function ChatProvider({socket, children}: React.PropsWithChildren<{socket: SocketIOClient.Socket}>) { 

    const [chats, setChats, clearChats] = useSessionStorage<IChats>("chats", []);
    const [isDrawCanvasOpen, setIsDrawCanvasOpen] = useState(false);
    
    //current chat
    const [currentChatId, setCurrentChatId] = useState("");
    const [
        currentChatMessages, 
        setCurrentChatMessages, 
        clearCurrentChatMessages
    ] = useSessionStorage<IMessage[]>("current-chat-messages", []);

    const history = useHistory();

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
        if (!currentChatId) return;
        (async() => {
            try {
                const res = await getChatMessagesById(currentChatId);
                console.log({res})
                if (res.data) setCurrentChatMessages(res.data);
            }catch(err) {
                //error - probably miss typed chatId
                history.push("/chats")
            }
        })();
    }, [currentChatId])


    const addMessageToCurrentChat = useCallback((data: IMessage) => {
        setCurrentChatMessages(prev => [...prev, data])
    }, [setCurrentChatMessages]);

    
    //on new message
    useEffect(() => {
        if (!socket) return;

        socket.on("new-message", (newMessage: ISendMessageRes) => {
            
            if (newMessage.meta.isNewChat) {
                return;
            }

            if (newMessage.meta.chatId === currentChatId) {
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

    }, [socket, currentChatId, addMessageToCurrentChat, setChats])


    const sendImageMesssage = ({image, userId}: {image: string, userId: string}) => {
        socket.emit("send-message", {image, chatId: currentChatId})
        addMessageToCurrentChat({from: userId, image})
    }
    
    const value = {
        chats,
        setChats,
        clearChats,
        currentChatId,
        setCurrentChatId,
        currentChatMessages,
        setCurrentChatMessages,
        clearCurrentChatMessages,
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