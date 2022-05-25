import axios from 'axios'
import md5 from 'js-md5'
import store from '../store'


function request0() {
  let b = new Date
  let a = b.getTime()

  const instance = axios.create({
    baseURL: '/api',
    //baseURL:'http://119.28.24.100:6200',
    TIMEOUT: 5000,
    method: 'post',
    headers: {
      'token': window.sessionStorage.getItem('token'),
      'key1': a,
      'link': store.state.link,
    }
  })

  // 请求拦截器
  instance.interceptors.request.use(config => {
    // store.state.loading = true
    // 客户信息挂载到请求头
    config.headers.ip = store.state.customer_info.ip
    config.headers.mobile = store.state.customer_info.mobile

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
      
    } else {

    }
    return res
  });

  return instance
}


export function request(config) {
  let instance = request0()
  return instance(config)
}

