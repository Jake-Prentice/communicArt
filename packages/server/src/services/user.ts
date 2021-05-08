
import {IUserSchema} from "@communicArt/common/src/types/schemas";
import User from "../models/User";

import bcrypt from "bcrypt";
import config from "../config";
import {ErrorHandler} from "../helpers/error";

export const getUserByEmail = async (email: string) => {
    return await User.findOne({email}).select("+password");
}

export const register = async (
    {email, username, password}: 
    Pick<IUserSchema, "email" | "username" | "password"> 
) => {
    if (await User.findOne({email})) throw new ErrorHandler(400, "email is taken!");
    const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);
    const newUser = await new User({email, username, password: hashedPassword});
    await newUser.save();   
}

export const login = async ({email, password}: Pick<IUserSchema, "email" | "password">) => {
    const user = await getUserByEmail(email);
    console.log(user)
    if (!user) throw new ErrorHandler(400, "no user with that email!");
    if (!await bcrypt.compare(password, user.password)) throw new ErrorHandler(400, "incorrect email or password!");
    return user._id;  
}

export const getCurrentUser = async (userId: string) => {
    return await User.findById(userId);
}