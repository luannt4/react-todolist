import { User } from "./userTypes";

const BASE_URL = 'https://dummyjson.com/users';

export const userAPI = {
  fetchUsers: async () => {
    const response = await fetch(`${BASE_URL}?limit=10`);
    const data = await response.json();
    return data.users;
  },

  fetchUserById: async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
  },

  addUser: async (userData: Omit<User, 'id'>) => {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  updateUser: async (userData: User) => {
    const response = await fetch(`${BASE_URL}/${userData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  deleteUser: async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};