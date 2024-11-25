// /components/TodoList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import {
  fetchUsers,
  addNewUser,
  updateUser,
  deleteUser,
  selectAllUsers,
  User,
} from './redux/userSlice';
import { RootState } from './redux/store';


const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const loading = useAppSelector((state: RootState) => state.users.loading);
  const error = useAppSelector((state: RootState) => state.users.error);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addNewUser({
      ...formData,
      age: parseInt(formData.age),
      image: 'https://robohash.org/default.png', // placeholder image
    }));
    setFormData({ firstName: '', lastName: '', email: '', age: '' });
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      dispatch(updateUser({
        ...editingUser,
        ...formData,
        age: parseInt(formData.age),
      }));
      setEditingUser(null);
      setFormData({ firstName: '', lastName: '', email: '', age: '' });
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age.toString(),
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingUser ? 'Update User' : 'Add User'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="border p-4 rounded shadow">
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-bold">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">Age: {user.age}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserList;
