const request = require('request')
const md5 = require('js-md5');



// get tbs
function getTbsClient(BDUSS) {
    return new Promise(function (resolve, reject) {
        let a = md5('BDUSS=' + BDUSS + 'tiebaclient!!!')
        a = a.toUpperCase()

        let body = {
            BDUSS: BDUSS,
            sign: a
        }
        request({
            url: 'http://c.tieba.baidu.com/c/s/tbs',
            method: 'post',
            json: true,
            headers: {
                'Connection': 'Keep-Alive',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Host': 'c.tieba.baidu.com',

            },

            formData: body

        }, (err, res2, body) => {
            if (body) {
                let tbs = body.tbs
                resolve(body.tbs)
            } else {
                resolve('body.tbs')
            }

        })
        // 异步处理
        // 处理结束后、调用resolve 或 reject
    });

}
// get sign 
function getSignClient(body) {
    let str = JSON.stringify(body)
    for (let i = 0;i < 200;i++) {
        str = str.replace(/,/, '')
        str = str.replace(/"/, '')
        str = str.replace(/:/, '=')
    }
    str = str.replace(/{/, '')
    str = str.replace(/}/, '')
    str = str + 'tiebaclient!!!'
    let sign = md5(str)
    sign = sign.toUpperCase()
    return sign

}
// get forum
function getForum(tid) {
    return new Promise(function (resolve, reject) {
        let body = {
            _client_type: '2',
            _client_version: '9.9.8.13',
            _phone_imei: '418980020498001',
            back: '0',
            from: 'tiebawap_bottom',
            kz: tid,
            pn: '1',
            q_type: '1',
            rn: '30',
            scr_dip: '2.0',
            scr_h: '1280',
            scr_w: '720',
            // sign: '826FE1F488AD558CB4D1F0B3D91A02C3',
            stErrorNums: '0',
            stMethod: '1',
            stMode: '1',
            stSize: '7499',
            stTime: '818',
            stTimesNum: '0',
            timestamp: '1609223320204',
            with_floor: '1',
        }
        let sign = getSignClient(body)
        console.log(sign)

        body.sign = sign
        request({
            url: 'http://c.tieba.baidu.com/c/f/pb/page',
            method: 'post',
            json: true,
            headers: {
                'Connection': 'Keep-Alive',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Host': 'c.tieba.baidu.com',

            },

            formData: body

        }, (err, res2, body) => {
            if (err) {
                return reject(err)
            }
            if (body) {
                resolve(body.forum)
            }

        })
    })

}
// ran 4
function randowNo4(number) {
    let a = Math.random() * number;
    let b = Math.floor(a);
    return b
}
// Cookie parse
function cookieParse(Cookie) {
    let Cookie2 = ''

    let num = Cookie.indexOf('BDUSS')
    let num2 = Cookie.indexOf(';', num)

    let a1 = Cookie.indexOf('----')
    let userName = Cookie.substring(0, a1)


    let a2 = Cookie.indexOf('----', a1 + 4)

    if (a2 < 1) {
        Cookie2 = Cookie.substring(a1 + 4)
    }
    let a3 = Cookie.indexOf('----', a2 + 4)
    if (a3 < 1 && a2 > 1) {
        Cookie2 = Cookie.substring(a2 + 4)
    }
    let a4 = Cookie.indexOf('----', a3 + 4)


    let BDUSS = Cookie.substring(num, num2)
    BDUSS = BDUSS.substring(6)

    Cookie2 = Cookie2.replace('H_WISE_SIDS=; ', '')
    if (a1 > 1 && a2 > 1 && a3 > 1 && a4 > 1) {
        let passward = Cookie.substring(a1 + 4, a2)
        let emailName = Cookie.substring(a2 + 4, a3)
        let emailPass = Cookie.substring(a3 + 4, a4)
        Cookie2 = Cookie.substring(a4 + 4)

        Cookie2 = Cookie2.replace('H_WISE_SIDS=; ', '')
        return {
            username: userName,
            passward: passward,
            email_username: emailName,
            email_passward: emailPass,
            Cookie2: Cookie2,
            BDUSS: BDUSS,
        }

    } else {
        return {
            username: userName,
            Cookie2: Cookie2,
            BDUSS: BDUSS,
        }
    }
}

async function getKwAndFid(tid) {
    try {
        let { id, name } = await getForum(tid)
        fid = id
        kw = name
        return { no: 0, fid: fid, kw: kw }
    } catch {
        return { no: 273, msg: '贴号错误' }
    }
}

function string_to_Array(str) {
    return str.replace(/\ +/g, "").split(/[(\r\n)\r\n]+/).filter((i) => {
        return i !== "";
    })
}


function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            resolve('ok')
        }, time)
    })

}
module.exports = {
    getTbsClient,
    getSignClient,
    getForum,
    randowNo4,
    cookieParse,
    getKwAndFid,
    string_to_Array,
    sleep,

}







