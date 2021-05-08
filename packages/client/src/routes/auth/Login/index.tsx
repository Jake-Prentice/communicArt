import React, { useState } from 'react'
import {
    Wrapper,
    InputField,
    AuthForm,
    AuthHeader,
    AuthModal,
    SubmitButton
} from "../style";
import {Margin} from "components/shared/spacing";
import {useUser} from "contexts/UserContext";
import { Redirect } from 'react-router';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const user = useUser();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await user.login({email, password});
            console.log("correct, logged in!")
        }catch(err) {
            console.log("wrong mate!")
        }
    }

    if (user.isAuth) return <Redirect to={"/chats"} />

    return (
        <Wrapper>
            <AuthModal>
                <AuthHeader>
                    <h1>Login</h1>
                </AuthHeader>
                <Margin bottom={"50px"}/>
                <AuthForm onSubmit={onSubmit}>
                    Email: 
                    <Margin bottom={"10px"} />
                    <InputField type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    Password:
                    <Margin bottom={"10px"} />
                    <InputField type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <Margin bottom={"10px"}/>
                    <SubmitButton type="submit">Submit</SubmitButton>
                </AuthForm>
            </AuthModal>
        </Wrapper>
    )
}

export default Login;
