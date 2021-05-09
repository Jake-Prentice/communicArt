import React, { useEffect, useState} from 'react'
import {StyledCanvas} from "./style";
import useDrawingCanvas from "./useDrawingCanvas"


const DrawCanvas = ({socket}: {socket?: SocketIOClient.Socket}) => {
    const {drawCanvas, ctx} = useDrawingCanvas({initialHeight: 500, initialWidth: 500});
    
    useEffect(() => {
        
     

    },[])

    const send = () => {
        const currentImage = drawCanvas.convertToImage();
        socket?.emit("send-message", {chatId: "60789101027c582590b51ec7", image: currentImage})
    }
    
    return (
        <>
        <StyledCanvas
            ref={drawCanvas.ref}
            onMouseDown={drawCanvas.startDrawing}
            onTouchStart={drawCanvas.startDrawing}

            onMouseUp={drawCanvas.finishDrawing}
            onTouchEnd={drawCanvas.finishDrawing}
            
            onMouseMove={drawCanvas.draw}
            onTouchMove={drawCanvas.draw}
        />
        <button onClick={drawCanvas.clear}>clear</button>
        <button onClick={send}>send</button>
        </>
    )   
}

export default DrawCanvas;