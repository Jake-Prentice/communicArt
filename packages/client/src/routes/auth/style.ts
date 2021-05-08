import Button from "components/shared/Button";
import styled from "styled-components";

export const InputField = styled.input`
    padding: 0.8rem;
    font-size: 0.8rem;
    border: none;
    background: #e8f0fe;
`

export const AuthModal = styled.div`
    width: 400px;
    /* border: 5px solid #D81E5B; */
    box-shadow: 0 0 15px rgba(0,0,0,.2);
    display: flex;
    flex-direction: column;
    padding: 2em;
    border-radius: 1rem;
    min-height: 500px;
`

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const AuthHeader = styled.div`
    display:flex;
`

export const AuthForm = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;

    ${InputField} {
        margin-bottom: 2rem;
    }
`

export const SubmitButton = styled(Button)`
    background: #7F7EFF;
    color: white;
    border-radius: 5px;
`