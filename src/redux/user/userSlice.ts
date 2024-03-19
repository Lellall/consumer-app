import {createSlice} from '@reduxjs/toolkit';
import {LoginResponse} from '../../screens/Authentication/auth-api';

const initialState: LoginResponse = {
  refresh_token: '',
  access_token: '',
  token_type: '',

  user: {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    role: '',
    isEmailVerified: false,
    registrationSource: '',
    streetName: '',
    houseNumber: '',
    apartmentName: '',
    estate: '',
    poBox: '',
    trail: false,
    address: {
      streetName: '',
      houseNumber: '',
      apartmentName: '',
      estate: '',
      poBox: '',
      region: '',
    },
  },
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
export const userSelector = (state: {user: LoginResponse}) => state.user;
