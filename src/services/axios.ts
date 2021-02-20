import axios from "axios";
import { message } from "ant-design-vue";
import qs from "qs";
const config = require("./config");
// 全局配置
// 创建 axios 实例
const service = axios.create({
  baseURL: config.api, // url = base url + request url
  timeout: 10000 // request timeout
});
// 响应成功
function responseSuccess(response: Record<string, any>) {
  if (response && (response.status === 200 || response.status === 304)) {
    if (response.data && response.data.retCode === 0) {
      return response.data;
    } else {
      message.error(response.data.retMsg);
      return;
    }
  } else {
    // 异常状态下，把错误信息返回去
    if (response && response.data && response.data.retMsg) {
      message.error(response.data.retMsg);
      return;
    } else if (response && response.status === 404) {
      message.error("访问异常");
      return;
    } else {
      message.error("网络错误");
      return;
    }
  }
}
// 响应错误
function responseError(response: Record<string, any>) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  message.error("网络错误");
  return response;
}

service.interceptors.request.use(
  (config: Record<string, any>) => {
    // 这里的config包含每次请求的内容
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    config.headers["Accept"] = "application/json";
    const token = sessionStorage.getItem("loginToken") || null;
    if (token) {
      // 如果token不为null，否则传token给后台
      config.headers["Token"] = token;
    }
    const data = qs.parse(config.data);
    for (const key in data) {
      if (!data[key]) delete data[key];
    }
    return config;
  },
  (error: Record<string, any>) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.resolve(error.response);
  }
);

// 请求方式配置
const Http: Record<string, any> = {};
Http.post = function(url: string, data: Record<string, any>) {
  return service({
    method: "post",
    url,
    data
  })
    .then((Response: Record<string, any>) => {
      return responseSuccess(Response);
    })
    .catch((Response: Record<string, any>) => {
      return responseError(Response);
    });
};
Http.get = function(url: string, params: Record<string, any>) {
  // get
  return service({
    method: "get",
    url,
    params // get 请求时带的参数
  })
    .then((Response: any) => {
      return responseSuccess(Response);
    })
    .catch((Response: any) => {
      return responseError(Response);
    });
};

export default Http;
