import React, { useContext, useEffect, useState } from 'react'
import useLocalStorage from "hooks/useLocalStorage";
import axios from "axiosBase";
import {AxiosRequestConfig } from "axios";
import { useChats } from './ChatContext';
import { PREFIX } from 'constants/';
import removeAllStored from 'utils/removeAllStored';

interface IProps {

}

enum ERRORS {
    AUTH="auth"
}

interface IUser {
    id?: string;
    name?: string;
}

export interface IUserValue {
    data: IUser;
    login: ({ email, password }: {
        email: string;
        password: string;
    }) => Promise<void>;
    accessToken: string;
    formatAccessToken: () => AxiosRequestConfig;
    isAuth: boolean;
    logout: () => void;
}

const UserContext = React.createContext<Partial<IUserValue>>({});

export const useUser = () => {
  return useContext(UserContext) as IUserValue;
}

export const UserProvider = ({children}: React.PropsWithChildren<IProps>) => {
    const [user, setUser] = useState<IUser>({});
    const [accessToken, setAccessToken] = useLocalStorage<string>("accessToken");
    const [isAuth, setIsAuth] = useState(!!accessToken);
    const [error, setError] = useState("");
    
    useEffect(() => {
        if (!accessToken) {
            setError(ERRORS.AUTH);
            return;
        }else {
        }

        (async() => {
            try {
                const res = await axios.get("/users/current");
                if (!res.data) throw new Error();
                console.log("user", res.data);
                setUser({
                    id: res.data._id,
                    name: res.data.username
                });
                setIsAuth(true);

            }catch(err) {setError(ERRORS.AUTH)}
        })();

    }, [accessToken])

    useEffect(() => {
        switch(error) {
            case ERRORS.AUTH:
                setIsAuth(false)
                break;

            default:
                break;
        }
    }, [error])

  
    const login = async ({email, password}: {email: string, password: string}) => {
        const {data: jwt} = await axios.post<string>("/users/login", {email, password}); 
        setAccessToken(jwt);
    }

    const logout = () => {
        removeAllStored(localStorage)
        removeAllStored(sessionStorage)
        setIsAuth(false);
    }


    const value = {
        data: user,
        login,
        accessToken,
        isAuth,
        logout
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
} 

export default useUser;