//定义用户相关数据的ts类型
//用户登录接口携带参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

//定义获取用户信息返回数据类型
export interface userInfoReponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}





// mock数据相关的ts类型定义文件
// // 登录接口需要携带参数ts类型
// export interface loginForm {
//   username: string;
//   password: string;
// }
// // 登录接口返回数据类型
// interface dataType {
//   token?: string;
//   message?: string;
// }
// export interface loginResponseData {
//   code: number;
//   data: dataType;
// }

// // 定义服务器返回用户信息相关的数据类型
// interface checkUser {
//   userId: number;
//   avatar: string;
//   username: string;
//   password: string;
//   desc: string;
//   roles: string[];
//   buttons: string[];
//   routes: string[];
//   token: string;
// }
// export interface userResponseData {
//   code: number;
//   data: { checkUser: checkUser };
// }
