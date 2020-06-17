"use strict";

import Vue from 'vue';
import axios from "axios";
import conf from "../config"
import qs from 'qs'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let config = {
  baseURL: conf.baseApi,
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  transformRequest(data){
    return qs.stringify(data,{ indices: false });
  }
};

let noApiUrl = conf.noApiUrl;


const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    let ignoreApi = false;
    for(let noApi of noApiUrl){
      if(config.url.indexOf(noApi)>=0){
        ignoreApi = true;
        break;
      }
    }
    if(!ignoreApi){
      config.baseURL=config.baseURL+conf.apiVersion;
    }
    let token = sessionStorage.getItem("accessToken");
    if(!token){
      token = localStorage.getItem("accessToken")
    }
    if(token){
      config.headers['token'] = token;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    if(response.data.code==500 && response.data.message=="账号在其他地方登录，请重新登录！"){
      window.location.href = "/";
    }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
let Plugin = {}; //不定义，IE11一下会报错，Plugin 未定义
Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
