import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`


const Page404: React.FC = () => {
    return (
        <Wrapper>
            <h1>404: This page does not exist</h1>
        </Wrapper>
    )
}
export default Page404;