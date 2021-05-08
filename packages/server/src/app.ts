import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {handleError, ErrorHandler} from "./helpers/error"
import mongoose from "mongoose";
import config from "./config"
import http from "http";
import {Server, Socket} from "socket.io";
import routes from "./routes";
import session from "express-session";
import * as chatService from "./services/chat";
import {verifyTokenAndAttachUser} from "./routes/middlewares/isAuth";

import {
    IChatSchema, 
    IUserSchema, 
    ISendMessageRes, 
    ICreateNewChatReq, 
    ISendMessageReq
} from "@communicArt/common/src/types/schemas";

//TODO - where do I put these?????
declare module 'express-session' {
    interface SessionData {
        userId: mongoose.Types.ObjectId;
    }
}

declare module "express-serve-static-core" {
    interface Request {
        user: Partial<IUserSchema>;
    }
}

declare module "socket.io" {
    interface Socket {
        user: Partial<IUserSchema>
    }
}



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", //[config.CLIENT_URL, config.IPV4URL]
        credentials: true
    }
});

//middleware
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}))

const sessionMiddleware = session({
    secret: config.SESSION_SECRET!,
    saveUninitialized: true,
    resave: true
})

app.use(sessionMiddleware);
io.use((socket, next) => {
    sessionMiddleware(
        socket.request as express.Request, 
        {} as express.Response, 
        next as express.NextFunction 
    );
})

//loaders
import "./loaders/mongoose" //start mongoose connection

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb");
})

mongoose.connection.on("error", () => {
    console.log("error when connecting to mongodb")
})

// socket.io
io.use(async (socket, next) => {
    const accessToken = socket.handshake?.query?.accessToken as string;
    //will return error if not valid and call next if it is.
    if (accessToken) verifyTokenAndAttachUser(accessToken, socket, next); 
    else throw new ErrorHandler(400, "no access token");
})


io.on("connection", async (socket) => {
    const userId = socket.user.id;   
    socket.join(userId);
    console.log("User connected with _id: ", userId);
    
    const sendMessageToRecipients = (chat: IChatSchema, image: string, isNewChat: boolean) => {
        //recipients is array of _id objects so you have to convert to string
        const receivingRecipients = chat.recipients.filter(r => r.toString() !== socket.user.id);
        
        const whatToSend: ISendMessageRes = {
            meta: {
                chatId: chat.id,
                isNewChat
            },
            data: {
                from: userId,
                image
            }
        }
        receivingRecipients?.forEach(recipient => {
            socket.broadcast.to(recipient.toString()).emit("new-message", whatToSend);
        })
        console.log("message successfully sent!");
    }

    socket.on("create-new-chat", async ({firstImageMessage, recipients}: ICreateNewChatReq) => {
        const chat = await chatService.createChat({recipients});
        console.log("created new chat, sending...");
        sendMessageToRecipients(chat, firstImageMessage, true);
    })

    socket.on("send-message", async ({chatId, image}: ISendMessageReq) => {
        try {

            const chat = await chatService.addImageMessage({chatId, image, userId});
            if (!chat) throw new ErrorHandler(500, "error adding message to chat");
            sendMessageToRecipients(chat, image, false);
        }catch(err) {throw new ErrorHandler(500, err.message)}
    })

})

//routes
app.use("/api", routes);

app.get("/api/test", async (req,res, next) => {
    // console.log(req.headers)
    res.send();
})

server.listen(+config.PORT, "192.168.1.79", () => {
    console.log(`listening on port ${config.PORT}`)
})

//catch 404
app.use((req,res,next) => {         
    const err = new ErrorHandler(404, "Not found!");
    next(err);
})

//error handlers
app.use((
    err: ErrorHandler, 
    req: any, 
    res: express.Response, 
    next: any
) => {
    handleError(err, res);
})