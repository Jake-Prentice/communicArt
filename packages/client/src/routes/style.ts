import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    } 
    html {
        font-size: 16px;
    }

    body {
        font-family: sans-serif;
    }

    body, html, #root {
        height: 100%;    
        width: 100%;
    }
    
` 