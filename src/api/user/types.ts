// 参数类型 - login
export interface ILoginParams {
  account: string;
  password: string;
}
// 数据类型 - login
export interface ILoginData {
  token: string;
  userId: string;
  userName?: string;
}

// 参数类型 - logout
export interface ILogoutParams {
  account: string;
}
// 数据类型 - logout
export interface ILogoutData {
  token: string;
}
