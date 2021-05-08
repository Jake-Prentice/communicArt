import axios from "axiosBase";
import {IMessageSchema, IUserSchema} from "@communicArt/common/src/types/schemas";

export const getChats = async () => {
    const res = await axios.get<Partial<IUserSchema>>("/chats");
    return res;
}

export const getChatMessagesById = async (chatId: string) => {
    const res = await axios.get<IMessageSchema[]>(`/chats/${chatId}`);
    return res;
}