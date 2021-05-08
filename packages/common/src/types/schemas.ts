import * as mongoose from "mongoose";

export interface IMessageSchema extends mongoose.Document {
    from: mongoose.Types.ObjectId | string;
    image: string;
}

export interface IChatSchema extends mongoose.Document {
    name: string;
    recipients: string[];
    messages: IMessageSchema[];
}

export interface IUserSchema extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    chats: IChatSchema[];
}

export interface INewMessage {
    from: string;
    image: string;
    newChat: boolean;
}

export interface ISendMessageRes {
    meta: {
        chatId: string;
        isNewChat: boolean;
    };
    data: {
        from: string;
        image: string;
    };
}

export interface ISendMessageReq {
    chatId: string;
    image: string;
} 

export interface ICreateNewChatReq {
    firstImageMessage: string;
    recipients: string[];
}