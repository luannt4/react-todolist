import { 
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from './store';
import { userAPI } from './userAPI';
import { User } from './userTypes';

// Export the User type if needed elsewhere
export type { User };  // Re-export the User type

const usersAdapter = createEntityAdapter<User>({
  //selectId: (user) => user.id,  // Remove selectId since it's using the default 'id' property
  sortComparer: (a, b) => a.firstName.localeCompare(b.firstName),
});

// Async Thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    return await userAPI.fetchUsers();
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: number) => {
    return await userAPI.fetchUserById(id);
  }
);

export const addNewUser = createAsyncThunk(
  'users/addNewUser',
  async (userData: Omit<User, 'id'>) => {
    return await userAPI.addUser(userData);
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData: User) => {
    return await userAPI.updateUser(userData);
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number) => {
    await userAPI.deleteUser(id);
    return id;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: false,
    error: null as string | null,
    selectedUserId: null as number | null,
  }),
  reducers: {
    setSelectedUser: (state, action: PayloadAction<number | null>) => {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      
      // Fetch single user
      .addCase(fetchUserById.fulfilled, (state, action) => {
        usersAdapter.upsertOne(state, action.payload);
      })
      
      // Add new user
      .addCase(addNewUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload);
      })
      
      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        usersAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      })
      
      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        usersAdapter.removeOne(state, action.payload);
      });
  },
});

export const { setSelectedUser } = usersSlice.actions;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors<RootState>((state) => state.users);

export default usersSlice.reducer;
