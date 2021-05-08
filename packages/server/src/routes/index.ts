import express from "express";
import userRouter from "./user";
import chatRouter from "./chat";

const router = express();

router.use("/users", userRouter);
router.use("/chats", chatRouter);


export default router;