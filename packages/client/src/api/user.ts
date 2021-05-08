import axios from "axiosBase"


interface IRegister {
    username: string;
    email: string;
    password: string;
}

export const register = async (data: IRegister) => {
    const res = axios.post("/users/register", data);
    return res;
}