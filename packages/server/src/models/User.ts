import { IUserSchema } from "@communicArt/common/src/types/schemas";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: {type: String, unique: true},
    password: {type: String, select: false}, //select false means that password won't show when you find User
    chats: [{type: mongoose.Schema.Types.ObjectId, ref: "Chat"}]
})

const User = mongoose.model<IUserSchema>("User", userSchema);
export default User;