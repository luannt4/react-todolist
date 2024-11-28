import axios from "axios";
import {RegisterCredentials} from "./auth.types";


const API_URL = process.env.REACT_APP_API_URL;

export const loginAPI = async (username: string, password: string) => {
    return await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    });
};

export const registerAPI = async (credentials: RegisterCredentials) => {
    return await fetch(`${API_URL}/users/add`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials),
    });
};

export const forgotPasswordAPI = async (email: string) => {
    return await axios.post(`${API_URL}/users/add`, {
        email,
        message: 'Simulated password reset request',
    });
};