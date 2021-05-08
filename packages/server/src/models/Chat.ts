import mongoose from "mongoose";
import {IChatSchema} from "@communicArt/common/src/types/schemas";
import {messageSchema} from "./Message";

const chatSchema = new mongoose.Schema({
    name: String,
    recipients: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    messages: [messageSchema]
})

const Chat = mongoose.model<IChatSchema>("Chat", chatSchema);
export default Chat;