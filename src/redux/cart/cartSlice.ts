import {createSlice} from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';
// import {useDispatch, useSelector} from 'react-redux';
// import {LoginResponse, User} from '../../screens/Authentication/auth-api';
import {Product} from '../../screens/MainApp/Shop/shop-api';

const initialState: Product[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.findIndex(item => item.id === action.payload.id);

      // If the item is not already in the cart (index is -1)
      if (itemIndex === -1) {
        // Add the item with a quantity of 1
        state.push({...action.payload, quantity: 1});
      } else {
        // Update the existing item's quantity
        state[itemIndex].quantity++;
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    clearCart: state => {
      state = [];
      return state;
    },
    increaseQuantity: (state, action) => {
      state.forEach(item => {
        if (item.id === action.payload.id) {
          item.quantity += 1;
        }
      });
    },
    decreaseQuantity: (state, action) => {
      state.forEach(item => {
        if (item.id === action.payload.id) {
          item.quantity = Math.max(0, item.quantity - 1);
        }
      });
    },
  },
});

export const {
  addToCart,
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
// export default userSlice.reducer;
// export const useUser = () => useSelector((state: LoginResponse) => state);
