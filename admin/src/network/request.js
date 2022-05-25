import axios from 'axios'
import md5 from 'js-md5'
import store from '../store'
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

const baseURL = window.host

function request0() {
  let b = new Date
  let a = b.getTime()
  const instance = axios.create({
    baseURL: '/api',
    TIMEOUT: 5000,
    method: 'post',
    headers: {
      'token': window.sessionStorage.getItem('token'),
      'key1': a
    }
  })
  let loadingInstance = null
  // 请求拦截器
  instance.interceptors.request.use(config => {
    if (store.state.is_loading == true) {
      store.state.loading = true
    }
    let objToStr = JSON.stringify(config.data)
    if (objToStr === undefined) objToStr = '{}'
    objToStr = objToStr + config.headers.key1
    let key = md5(objToStr)
    config.headers.key2 = key

    return config

  }, err => {

  });
  // 响应拦截器
  instance.interceptors.response.use(res => {
    store.state.loading = false
    if (res.data.code === 0) {
      if (res.data.msg != null && res.data.msg != undefined && res.data.msg != '') {
        Message.success(res.data.msg);
      }
    } else if (res.data.code === 20) {
      Message.error(res.data.err);

    } else {
      Message.error(res.data.msg);
    }

    return res
  });

  return instance
}


export function request(config) {
  let instance = request0()
  return instance(config)
}

