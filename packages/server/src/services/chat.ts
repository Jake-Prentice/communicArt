
import {IUserSchema} from "@communicArt/common/src/types/schemas";
import {IChatSchema} from "@communicArt/common/src/types/schemas";
import Chat from "../models/Chat";
import User from "../models/User";
import bcrypt from "bcrypt";
import config from "../config";
import {ErrorHandler} from "../helpers/error";
import mongoose from "mongoose"

export const createChat = async ({recipients}: Pick<IChatSchema, "recipients">) => {
    const newChat = new Chat({recipients: recipients});
    await User.updateMany({
        _id: {"$in": recipients}}, {"$push": { chats: newChat._id } }
    );
    await newChat.save();
    return newChat
}


export const addImageMessage = async (
    {chatId, image, userId}: 
    {chatId: string, image: string, userId: mongoose.Types.ObjectId | string}
) => {    
    return await Chat.findOneAndUpdate({_id: chatId}, {"$push": {messages: {
        from: userId,
        image
    }}});
    // return await User.findOne

}

