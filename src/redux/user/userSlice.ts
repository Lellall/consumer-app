import { createSlice } from '@reduxjs/toolkit';
import { LoginResponse } from '../../screens/Authentication/auth-api';

const initialState: LoginResponse = {
  refresh_token: '',
  access_token: '',
  token_type: '',
  user: undefined,
};
const setAuthHandler = (state, { payload: auth }) => {
  state = auth;
  return state;
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: setAuthHandler,
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = userSlice.actions;
