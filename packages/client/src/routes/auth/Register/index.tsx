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
import {register} from "api/user";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    const [username, setUsername] = useState("");
    const [isSignUpSucessful, setIsSignUpSuccessful] = useState(false);

    const user = useUser();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (confirmPasswordValue !== password) return alert("passwords aren't the same!");
        try {
            await register({username, email, password});
            console.log("signed up success!")
            setIsSignUpSuccessful(true);
        }catch(err) {
            console.log("signup failed!");
        }
    }

    if (isSignUpSucessful) return <Redirect to={"/login"} />
    if (user.isAuth) return <Redirect to={"/chats"} />


    return (
    
            <Wrapper>
                <AuthModal>
                    <AuthHeader>
                        <h1>Sign up</h1>
                    </AuthHeader>
                    <Margin bottom={"50px"}/>
                    <AuthForm onSubmit={onSubmit}>
                        Username: 
                        <Margin bottom={"10px"} />
                        <InputField value={username} onChange={e => setUsername(e.target.value)}/>
                        Email: 
                        <Margin bottom={"10px"} />
                        <InputField value={email} onChange={e => setEmail(e.target.value)}/>
                        Password:
                        <Margin bottom={"10px"} />
                        <InputField type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        Confirm password:
                        <Margin bottom={"10px"} />
                        <InputField type="password" value={confirmPasswordValue} onChange={e => setConfirmPasswordValue(e.target.value)}/>
                        <Margin bottom={"10px"}/>
                        <SubmitButton type="submit">Submit</SubmitButton>
                    </AuthForm>
                </AuthModal>
            </Wrapper>
    )
}

export default Register;
