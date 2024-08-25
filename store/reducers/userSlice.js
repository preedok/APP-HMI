/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import {loginUser} from './authSlice';

const initialState = {
  data: {},
  status: 'idle',
  error: null,
  message: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    updateUserPhoto: (state, action) => {
      if (state.data) {
        state.data.photo = action.payload;
      }
    },
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.user[0];
        state.message = action.payload.user.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setUser, updateUserPhoto, reset} = userSlice.actions;

export default userSlice.reducer;
