import { request } from '../request'




export function get_order_page(parameter) {

    return request({
        url: '/merchant/order/page',
        method: 'get',
        params: parameter
    })
}

