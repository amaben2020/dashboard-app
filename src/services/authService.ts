import axios from 'axios';
import { EndPoints } from '../api/axios';

export interface IUser {
  email: string;
  password: string;
}
export type RegisterModel = {
  email: string;
  password: string;
  name: string;
  mobile: string;
  policy: boolean;
};
export const loginAxios = async (userInfo: IUser) => {
  if (!userInfo.hasOwnProperty('email')) return;
  try {
    /*The return object will be an object with an access token of type string. 
    We're expecting an access token from the json-server-auth */
    const { data } = await axios.post<{ accessToken: string }>(
      EndPoints.login,
      userInfo,
    );
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export async function registerAxios(registerModel: RegisterModel) {
  await axios.post<{ accessToken: string }>(EndPoints.register, registerModel);
}
