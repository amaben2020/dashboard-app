import axios from 'axios';
import api, { EndPoints } from '../api/axios';

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

export type ChangePasswordModel = {
  email: string;
  password: string;
  id: string;
};
export async function changePassWordAxios(
  changePasswordModel: ChangePasswordModel,
) {
  return await axios.put<void>(
    `${EndPoints.users}/${changePasswordModel.id}`,
    changePasswordModel,
  );
}

export const loginAxios = async (userInfo: IUser) => {
  return await api.post<{ accessToken: string }>(EndPoints.login, userInfo);
};

export async function registerAxios(registerModel: RegisterModel) {
  return await api.post<{ accessToken: string }>(
    EndPoints.register,
    registerModel,
  );
}
