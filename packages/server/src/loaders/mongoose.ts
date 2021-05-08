import mongoose from "mongoose"
import config from "../config"
import {ErrorHandler} from "../helpers/error";

(() => {
    mongoose.connect(config.MONGO_URI!,{ 
        useUnifiedTopology: true,
        useNewUrlParser: true, 
        useFindAndModify: false,
        useCreateIndex: true 
    }).catch(err => {throw new ErrorHandler(500, err.message)});
})()