const { default: axios } = require('axios')
const request = require('request')

let { getTbsClient, getSignClient, getForum, randowNo4, getKwAndFid, cookieParse, } = require('./client_util')

let headers = {
    'Connection': 'Keep-Alive',
    // 'Accept': 'application/json, text/javascript, */*; q=0.01',
    // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Host': 'c.tieba.baidu.com',
}

async function reply(body) {

    let { tid, BDUSS, content } = body
 
    try {
        let tbs = await getTbsClient(BDUSS)
        let { fid } = await getKwAndFid(tid)
        return client_api({
            headers: headers,
            url: 'http://c.tieba.baidu.com/c/c/post/add',
            method: 'post',
            body: {
                BDUSS: BDUSS,
                _client_id: 'wappc_1634182732206_368',
                _client_type: '2',
                _client_version: '12.11.0.0',
                _phone_imei: `000000000000000`,
                content: content,
                fid: fid,
                tbs: tbs,
                tid: tid,
            }
        })
    } catch (error) { throw (error) }
}

// 修改昵称
// params { BDUSS, name } 要改的昵称
async function rename(body) {
    let { BDUSS, name } = body
    try {
        let tbs = await getTbsClient(BDUSS)
        return client_api({
            headers: headers,
            url: 'http://c.tieba.baidu.com/c/c/profile/modify',
            method: 'post',
            body: {
                BDUSS: BDUSS,
                _client_id: 'wappc_1634182732206_368',
                _client_type: '2',
                _client_version: '12.11.0.0',
                _phone_imei: `000000000000000`,
                from: 'tieba',
                nick_name: name,
                net_type: '1',
                tbs: tbs,
            }
        })
    } catch (error) { throw (error) }
}

// 分享贴子 获得经验加成 封禁id可操作
// params { BDUSS, tid }
async function share(body) {
    let { BDUSS, tid } = body

    try {
        let { fid } = await getKwAndFid(tid)
        return client_api({
            headers: headers,
            url: 'http://c.tieba.baidu.com/c/c/forum/share',
            method: 'post',
            body: {
                "BDUSS": BDUSS,
                "_client_id": "wappc_1634182732206_368",
                "_client_type": 2,
                "_client_version": "12.11.0.0",
                "_phone_imei": "000000000000000",
                "forum_id": fid,
                "thread_id": tid,
            }
        })
    } catch (error) { throw (error) }
}

// 关注贴吧 
// params { BDUSS, tid }
async function share(body) {
    let { BDUSS, tid } = body
    try {
        let { fid } = await getKwAndFid(tid)
        return client_api({
            headers: headers,
            url: 'http://c.tieba.baidu.com/c/c/forum/like',
            method: 'post',
            body: {
                "BDUSS": BDUSS,
                "_client_id": "wappc_1634182732206_368",
                "_client_type": 2,
                "_client_version": "12.11.0.0",
                "_phone_imei": "000000000000000",
                "forum_id": fid,
                "thread_id": tid,
            }
        })
    } catch (error) { throw (error) }
}

// 签到贴吧 
// params { BDUSS, tid }
async function sign(body) {
    let { BDUSS, kw } = body
    try {
        let tbs = await getTbsClient(BDUSS)
        let fid = await get_fid_by_kw(kw)
        console.log(kw, fid)
        return client_api({
            headers: headers,
            url: 'http://c.tieba.baidu.com/c/c/forum/sign',
            method: 'post',
            body: {
                "BDUSS": BDUSS,
                "_client_id": "wappc_1634182732206_368",
                "_client_type": 2,
                "_client_version": "12.11.0.0",
                "_phone_imei": "000000000000000",
                "fid": fid,
                "kw": kw,
                "tbs": tbs

            }
        })
    } catch (error) { throw (error) }
}


// 点赞 
// params { BDUSS, tid }
async function agree(body) {
    let { BDUSS, tid, type, post_id } = body

    try {
        let tbs = await getTbsClient(BDUSS)
        return client_api({
            headers: headers,
            url: 'http://c.tieba.baidu.com/c/c/agree/opAgree',
            method: 'post',
            body: {
                "BDUSS": BDUSS,
                "_client_id": "wappc_1634182732206_368",
                "_client_type": 2,
                "_client_version": "12.11.0.0",
                "_phone_imei": "000000000000000",
                "active_timestamp": 1634341975237,
                "agree_type": type,
                "net_type": 1,
                "obj_type": 3,
                "op_type": 0,
                "post_id": post_id,
                "tbs": tbs,
                "thread_id": tid,
            }
        })
    } catch (error) { throw (error) }
}

// 获取贴子信息 
// params { BDUSS, tid }
async function post_page(tid) {
    try {
        return client_api({
            headers: headers,
            url: 'http://c.tieba.baidu.com/c/f/pb/page',
            method: 'post',
            body: {
                "_client_type": 2,
                "_client_version": "10.3.8.1",
                "_phone_imei": 418980020498001,
                "back": 0,
                "from": "tiebawap_bottom",
                "kz": tid,
                "lz": 1,
                "pn": 1,
                "q_type": 1,
                "rn": 30,
                "scr_dip": "2.0",
                "scr_h": 1280,
                "scr_w": 720,
                "stErrorNums": 0,
                "stMethod": 1,
                "stMode": 1,
                "stSize": 7499,
                "stTime": 818,
                "stTimesNum": 0,
                "timestamp": 1634640121478,
                "with_floor": 1,
            }
        })
    } catch (error) { throw (error) }
}



// 贴吧客户端统一请求方法
function client_api(options) {
    let { body, headers, url, method } = options

    return new Promise(function (resolve, reject) {
        let sign = getSignClient(body)
        body.sign = sign
        // req = body + headers
        request({
            url: url,
            method: method,
            json: true,
            headers: headers,
            formData: body
        }, (err, res2, body) => {
            resolve(body)
            reject(err)
        })
    })
}


async function get_fid_by_kw(kw) {
    try {
        let res = await axios({
            url: 'https://tieba.baidu.com/f/commit/share/fnameShareApi',
            params: {
                ie: 'utf-8',
                fname: kw,
            }
        })
        return res.data.data.fid
    } catch (error) { throw (error) }


}

let BDUSS = `EdXeHItMU1vTW5HWVZ6dlh0TEtFWDljdVZkWEpYQU04V0QwUWEtRk4tdWwtSkZoRVFBQUFBJCQAAAAAAAAAAAEAAADBoftFeWtpaXZueXQ2MDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKVramGla2phU`
// share({
//     BDUSS: `EdXeHItMU1vTW5HWVZ6dlh0TEtFWDljdVZkWEpYQU04V0QwUWEtRk4tdWwtSkZoRVFBQUFBJCQAAAAAAAAAAAEAAADBoftFeWtpaXZueXQ2MDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKVramGla2phU`,
//     tid: 3983009574,
// }).then(res => {
//     console.log(res)
// })

// post_page(7530150175).then(res => {
//     console.log(res.post_list[0])
// })


// reply({
//     BDUSS: BDUSS,
//     content: '哈哈',
//     tid: '7580921130',
// }).then(res =>{
//     console.log(res)
// })

// agree({
//     BDUSS: `xBcE1MaVc0dVN4andWdWlMdTdqWjRJWGNyVkItTHU2WFY5S3N3ZUVrd2N6cEZoRUFBQUFBJCQAAAAAAAAAAAEAAADzqyBIcm9uZ3FtZWl2c2ozNgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABxBamEcQWphZ0`,
//     tid: 7580921130,
// }).then(res => {
//     console.log(res)
// })


// sign({
//     BDUSS: `HdsMWk4aXBSaE1qNWlZZktVaFY1MHZzZzlCZ1lVVDdKMmVGMzBiY1ZEbHp1bFZnSVFBQUFBJCQAAAAAAAAAAAEAAAAJR4U3ZGkzMTQyNwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHMtLmBzLS5gO`,
//     kw: 'lolid',
// }).then(res => {
//     console.log(res)
// })




setInterval(() => {
    reply({
        tid: '7578267408',
        BDUSS: `XduSlNFb1paa1NhRnRkbDJRYjYybVBGeEZYUk9Ba35nUHk5TjMyUmZPRFRiVk5nSVFBQUFBJCQAAAAAAAAAAAEAAADPQqNzs~bR3dK7yfq1xNDSuKMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANPgK2DT4CtgW`,
        content: 'd'
    }).then(res => {
        console.log(res)
    })

}, 6000000)
module.exports = {
    reply,
    rename,
    agree,
    sign,
    post_page,
}
