import styled from "styled-components";

export const Wrapper = styled.div`
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 0 100vh rgba(0,0,0,.5);
    background: white;
    display: flex;
    flex-direction: column;
    /* border: 2px solid black; */
    user-select: none;
    width: 500px;
    height: 400px;

`