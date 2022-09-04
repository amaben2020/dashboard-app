import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'models/user-type';
import { ProfileActionTypes } from './profileActionTypes';
import {
  getUserByIdFromDbAxios,
  putUserFromDbAxios,
} from 'services/userDBService';

// here, we simply use the service to update the reducer with actual data via the createAsyncThunk function.
export const getProfileAction = createAsyncThunk(
  ProfileActionTypes.FETCH_AND_SAVE_PROFILE,
  async (id: string) => {
    return (await getUserByIdFromDbAxios(id)).data;
  },
);
export const putProfileAction = createAsyncThunk(
  ProfileActionTypes.UPDATE_PROFILE,
  async (user: UserType) => {
    return (await putUserFromDbAxios(user)).data;
  },
);
