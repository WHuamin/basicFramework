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
  account?: string;
}
// 数据类型 - logout
export interface ILogoutData {
  bg_binary: string;
  bg_hash_basename: string;
  bg_snapshot_delay_ms: string;
  injector_basename: string;
  is_gen_204: string;
  rc_enable: string;
  sodar_query_id: string;
}
