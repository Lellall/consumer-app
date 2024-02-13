import {createSlice} from '@reduxjs/toolkit';
import {LoginResponse} from '../../screens/Authentication/auth-api';

const initialState: LoginResponse = {
  refresh_token: '',
  access_token: '',
  token_type: '',
  user: undefined,
};
const setAuthHandler = (state: LoginResponse, {payload: auth}) => {
  state = auth;
  return state;
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: setAuthHandler,
    logout: () => {
      return initialState;
    },
  },
});

export const {setUser, logout} = userSlice.actions;
