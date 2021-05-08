import express from "express";
import * as userService from "../services/user";
import { ErrorHandler } from "../helpers/error";
import isAuth from "./middlewares/isAuth";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

const router = express.Router();

router.get("/current", isAuth, async (req,res, next) => {
    try {
        res.status(200).json(
            await User.findById(req.user._id).select("username")
        );
    }catch(err){next(err)}
})

router.post("/register", async (req, res, next) => {
    try {
        await userService.register({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        res.status(200).end();
    }catch(err) {next(err)};
})

router.post("/login", async (req,res, next) => {
    try {
        console.log("logging in")
        console.log(req.body)
        const userId = await userService.login({
            email: req.body.email,
            password: req.body.password
        })

        req.session.userId = userId; //start cookie
        
        const accessToken = jwt.sign({userId}, config.ACCESS_TOKEN_SECRET)
        res.status(200).json(accessToken);
        
        // res.status(200).end();
    }catch(err) {next(err)}
})

router.get("/logout", (req,res,next) => {
    try { 
        req.session.destroy(err => {throw new ErrorHandler(500, err)});
    }catch(err) {next(err)}
})


export default router;