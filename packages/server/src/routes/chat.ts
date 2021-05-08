import express from "express";
import * as chatService from "../services/chat";
import User from "../models/User";
import { ErrorHandler } from "../helpers/error";
import isAuth from "./middlewares/isAuth";
import Chat from "../models/Chat";

const router = express.Router();

//get chats from user
router.get("/", isAuth, async (req,res,next) => {
    try {
        const chats = await User.findById(req.user.id).populate({
            path: "chats",
            select: "name"
        })
        console.log(chats);
        res.json(chats).status(200);
    }catch(err) {next(err)}
})

//create new chat room
router.post("/", isAuth, async (req,res,next) => {
    try {
        await chatService.createChat({
            recipients: [req.session.userId, ...req.body.recipients]
        });
        res.status(200).end();
    }catch(err) {next(err)}
})

router.get("/:chatId", isAuth, async (req,res,next) => {
    try {
        const chat = await Chat.findById(req.params.chatId);
        if (!chat) throw new ErrorHandler(500, "chatId not found!");
        
        const limitedMessages = chat.messages.slice(-10);
        res.json(limitedMessages).status(200);
    }catch(err) {next(err)}
})

// not neccessary
router.post("/:chatId", isAuth, async (req,res, next) => {
    try {
        await chatService.addImageMessage({
            chatId: req.params.chatId,
            image: req.body.image,
            userId: req.session.userId!
        })
        res.status(200).end();
    }catch(err) {next(err)}
})

export default router;