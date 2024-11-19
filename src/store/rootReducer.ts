// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import compareReducer from '../features/compare/compareSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import authReducer from '../features/auth/authSlice';


const rootReducer = combineReducers({
    compare: compareReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  });
  
export default rootReducer;