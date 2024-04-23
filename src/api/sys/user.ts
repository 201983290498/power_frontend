import { defHttp } from '/@/utils/http/axios';
import { LoginParams, PowLoginResultModel, PowGetUserInfoModel } from './model/userModel';
import { ErrorMessageMode } from '/#/axios';
import { AxiosRequestHeaders } from 'axios';
import { getToken } from '/@/utils/auth';

enum Api {
  Login = '/powergrid/user/account/token',
  Logout = '/logout',
  GetUserInfo = '/powergrid/user/account/info',
  GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<PowLoginResultModel>( // 指定返回的对象
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  const headers: AxiosRequestHeaders = {
    Authorization: 'Bearer ' + getToken(),
  };
  // 获取用户信息
  return defHttp.post<PowGetUserInfoModel>(
    { url: Api.GetUserInfo, headers },
    { errorMessageMode: 'none' },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
