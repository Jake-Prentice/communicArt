import express from "express"

class ErrorHandler extends Error {
    constructor(
        public status: number = 500, 
        public message: string = ""
    ) {
      super();
    }
}

const handleError = (err: ErrorHandler, res: express.Response) => {
    if (!err.status) {
        console.error(err);
        err.status = 500;
    }
    res.status(err.status); //internal server errors should have status code of 500
    res.json({
        error: {
            message: err.message,
        }
    })
}

export {ErrorHandler, handleError}