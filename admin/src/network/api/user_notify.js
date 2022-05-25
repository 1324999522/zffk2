import { request } from '../request'




export function get_user_notify_page(parameter) {

    return request({
        url: '/merchant/user_notify/page',
        method: 'get',
        params: parameter
    })
}

export function put_user_notify_clear(parameter) {

    return request({
        url: '/merchant/user_notify/clear',
        method: 'put',
        params: parameter
    })
}


