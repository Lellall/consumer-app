import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type UIState = {
  initiateOrder: boolean;
  orderInfo: {
    orderId: number | string;
    totalAmount: number;
  };
  login: boolean;
};
const initialState: UIState = {
  initiateOrder: false,
  orderInfo: {orderId: '', totalAmount: 0},
  login: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setInitiateOrder(state, {payload}: PayloadAction<boolean>) {
      state.initiateOrder = payload;
      return state;
    },
    setOrderInfo(state, {payload}: PayloadAction<UIState['orderInfo']>) {
      state.orderInfo = payload;
      return state;
    },
    setLogin(state, {payload}: PayloadAction<boolean>) {
      state.login = payload;
      return state;
    },

    reset() {
      return initialState;
    },
  },
});

export const {setInitiateOrder, setOrderInfo, setLogin, reset} =
  uiSlice.actions;

export const uiSelector = (state: {ui: UIState}) => state.ui;
