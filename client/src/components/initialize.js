import { request } from '@/network/request.js'
import Vue from 'vue';
import Store from '@/store'
import { Message } from 'element-ui';



export default async function (Vue) {

}

// 网络请求
Vue.prototype.$http = request
// 复制到剪贴板
// 参数 文本内容
Vue.prototype.$copy = copy

// 下载文件方法 浏览器自动下载
// 参数 { new blob , filename }
// let blob = new Blob([this.order.cards_string], { type: "text/plain;charset=utf-8" });
import download_txt from '@/components/util/download_txt'
Vue.prototype.$download_txt = download_txt.saveAs

import { cookieParse } from '@/components/util/tb_cookieParse'
Vue.prototype.$cookieParse = cookieParse

// 判断设备
function _isMobile() {
    let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    return flag
}
if (_isMobile()) { Vue.prototype.$isPhone = true } else { Vue.prototype.$isPhone = false }

// 存储用户信息
Store.state.customer_info.isPhoen = true
try { Store.state.customer_info.mobile = _isMobile()[0] } catch {
    Store.state.customer_info.mobile = 'PC'
    Store.state.customer_info.isPhoen = false
}





// 复制文本
function copy(Copytext) {
    let textarea = document.createElement('textarea');
    textarea.value = Copytext
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('Copy')
    if (document.execCommand('Copy')) Message.success('复制成功');
    textarea.remove();
}

