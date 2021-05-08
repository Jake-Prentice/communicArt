import jwt from "jsonwebtoken";
import express from "express";
import config from "../../config";
import {ErrorHandler} from "../../helpers/error";
import {Socket} from "socket.io";
import {getCurrentUser} from "../../services/user";
import { IUserSchema } from "@communicArt/common/src/types/schemas";

interface IDecodedUser {
    userId: IUserSchema["id"]     
}

export const verifyTokenAndAttachUser = async (
    accessToken: string, 
    object: express.Request | Socket, 
    nextFunction: express.NextFunction | ((err?: Error) => void)
) => { 
    try {
        if (!accessToken) throw new ErrorHandler(400, "no access token");
        const verifiedToken = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET)
        const data =  await getCurrentUser((verifiedToken as IDecodedUser).userId);
        if (!data) throw new ErrorHandler(500, "no user found");
        object.user = data;
        nextFunction();
    }catch(err) {
        console.log("there has been an error!");
        nextFunction(err)
    }
}

const isAuth = async (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction
) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    verifyTokenAndAttachUser(token, req, next);
}

export default isAuth;