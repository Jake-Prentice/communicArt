import React from "react";
import {Redirect, useLocation} from "react-router-dom";


const RedirectAs404 = () => (
    <Redirect to={{
        ...useLocation(),
        state: {
            is404: true
        }
    }} />
)

export default RedirectAs404;