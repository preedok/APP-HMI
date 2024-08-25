/* eslint-disable prettier/prettier */
// import {createSlice} from '@reduxjs/toolkit';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({emailRef, passwordRef}, {rejectWithValue}) => {
    try {
      const response = await axios.post(`https://odd-plum-cougar-cuff.cyclic.app/auth/login`, {
        email: emailRef.current,
        password: passwordRef.current,
      });
      const {token} = response?.data;
      const {message} = response?.data;
      const user = response?.data?.data;
      return {token, user, message};
    } catch (error) {
      const messages = error.response?.data?.message;
      return rejectWithValue(messages);
    }
  },
);

const initialState = {
  token: null,
  status: 'idle',
  message: '',
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload;
      });
  },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;
