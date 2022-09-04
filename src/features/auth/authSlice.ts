import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClaimsType } from 'models/claims-type';

const authNamespace = 'auth';
export type AuthStateType = {
  readonly accessToken: string;
  readonly claims: ClaimsType | null;
};

/*we are using the AuthStateType to type safe our initial state */
export const initialState: AuthStateType = {
  accessToken: '',
  claims: null,
};

export const authSlice = createSlice({
  name: authNamespace,
  initialState,
  /*Non asynchronous actions. Does not require Axios.*/
  reducers: {
    saveTokenAction: (state, action: PayloadAction<string>) => {
      state.accessToken = action?.payload;
    },
    saveClaimsAction: (state, action: PayloadAction<ClaimsType>) => {
      state.claims = action?.payload;
    },
  },

  /*Asynchronous actions. Actions that require Axios.*/
  extraReducers: builder => {},
});
