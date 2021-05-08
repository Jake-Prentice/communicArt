import { IMessageSchema } from "@communicArt/common/src/types/schemas";
import mongoose from "mongoose";


export const messageSchema = new mongoose.Schema({
    from: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    image: String
}, {
    timestamps: {createdAt: new Date().toLocaleString()}
})

const Message = mongoose.model<IMessageSchema>("Message", messageSchema); 
export default Message;
