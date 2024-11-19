

export interface LoginCredentials {
    username: string;
    password: string;
    rememberMe?: boolean;
  }
  
export interface RegisterInputs {
    username: string;
    email: string;
    password: string;
}
const API_URL = process.env.REACT_APP_API_URL;

export const loginAPI = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
};
  
export const registerAPI = async (credentials: RegisterInputs) => {
    const response = await fetch(`${API_URL}/users/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
};