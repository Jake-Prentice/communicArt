import React, { useEffect, useState} from 'react'
import useDrawingCanvas from 'hooks/useDrawingCanvas';
import { BrushSizeSettings, StyledColorCircle, ColorSettings, DrawCanvasSettings, ExitButton, StyledCanvas, Wrapper, SendButton } from './style';
import { PaperPlane } from '@styled-icons/fa-solid';
import { Margin } from 'components/shared/spacing';
import { useChats } from 'contexts/ChatContext';
import useUser from 'contexts/UserContext';

const NewImageMessage = () => {
    
    const chats = useChats()!;
    const user = useUser()!;

    const {drawCanvas, ctxRef, setCtx} = useDrawingCanvas({initialHeight: 500, initialWidth: 500});
    const [currentColor, setCurrentColor] = useState("black");

    const ColorCircle = ({background}: {background: string}) => {
        return (
            <StyledColorCircle 
                isSelected={background === currentColor} 
                background={background} 
                onClick={() => setCurrentColor(background)}
            />
        )
    }   
    useEffect(() => {drawCanvas.initStyles({
        strokeStyle: currentColor,
        lineWidth: 5
    })}, [])

    useEffect(() => {
        setCtx({strokeStyle: currentColor});
    }, [currentColor])

    const onSend = (e: React.FormEvent) => {
        e.preventDefault();
        const image = drawCanvas.convertToImage();
        if (!image) return;
        chats.sendImageMesssage({image, userId: user.data.id!})
        chats.setIsDrawCanvasOpen(false);
    }


    return (
        <Wrapper>
            <div style={{position: "relative"}}>
                <ExitButton onClick={() => chats?.setIsDrawCanvasOpen(false)}>exit</ExitButton>
                <StyledCanvas
                    ref={drawCanvas.ref}
                    onMouseDown={drawCanvas.startDrawing}
                    onTouchStart={drawCanvas.startDrawing}

                    onMouseUp={drawCanvas.finishDrawing}
                    onTouchEnd={drawCanvas.finishDrawing}
                    
                    onMouseMove={drawCanvas.draw}
                    onTouchMove={drawCanvas.draw}
                />
                <DrawCanvasSettings>
                    <ColorSettings>
                        <ColorCircle background={"red"}/>
                        <ColorCircle background={"blue"}/>
                        <ColorCircle background={"green"}/>
                        <ColorCircle background={"yellow"}/>
                        <ColorCircle background={"purple"}/>
                        <ColorCircle background={"black"}/>
                    </ColorSettings>
                    <BrushSizeSettings>brush size: 2</BrushSizeSettings>
                </DrawCanvasSettings>
                <form onSubmit={onSend}>
                    <SendButton>
                        Send
                        <Margin auto />
                        <PaperPlane size={"1rem"}/>
                    </SendButton>
                </form>
            </div>
        </Wrapper>
    )
}

export default NewImageMessage;
