const fs = require('fs')
const path = require('path')
const express = require('express')
const md5 = require('js-md5')
const router = express.Router()
const { sequelize, models, Op } = require('../sequelize')
const { user, role, popedom, api_log, merchant } = models



module.exports = (app) => {

    // MD5
    app.use(verify_sign)
    // 初始化
    app.use((req, res, next) => {
        res.result = { code: 0, msg: new String(), error: new String(), data: new Object() }
        res.where = new Object()
        next()
    })
    // 系统
    app.use('/v0', verify_token, verify_power)
    routes_mount(app, '/v0')

    // 商户
    app.use('/merchant', verify_token, verify_power, before_merchant)
    routes_mount(app, '/merchant')


    // 客户端
    app.use('/client', before_client)
    routes_mount(app, '/client')

    // 返回成功数据
    app.use(function (req, res, next) {
        res.send(res.result)
    })

    // 统一错误处理
    app.use(handle_error)



}

function routes_mount (app, routes_path) {
    let files = fs.readdirSync(path.join(__dirname, `.${routes_path}`))
    for (let file of files) {
        file = file.replace('.js', '')
        const router = require(`.${routes_path}/${file}`);

        app.use(`${routes_path}/${file}`, router)
    }
}


// 验证签名
async function verify_sign (req, res, next) {
    if (req.url === '/client/order/pay/success') {
        return next()
    }
    const objToStr = JSON.stringify(req.body) + req.headers.key1

    if (md5(objToStr) === req.headers.key2) {
        next()
    } else {
        next('签名验证失败')
    }
}


// 验证token
async function verify_token (req, res, next) {

    try {
        let User = await user.verify(req.headers.token)
        User = await user.findByPk(User.id)
        res.user = User
        // res.where.userId = res.user.id
        // console.log(res.where.userId)
        next()
    } catch (error) {
        res.result.msg = '验证用户token失败'
        next(error)
    }

}

// 验证用户权限
async function verify_power (req, res, next) {
    let User = res.user
    try {
        let popedoms = await User.getPopedoms()
        // 获取权限验证结果
        let { flag, popedom } = user.authentication(popedoms, req)

        // 写入api记录
        let Api_log = await api_log.create({ path: req.path, method: req.method.toLowerCase(), userId: User.id, status: flag, ip: res.client.ip })

        if (flag) {
            Api_log.popedomId = popedom.id
            Api_log.save()
        }

    } catch (error) {
        res.result.msg = '验证用户权限失败'
        next(error)
    }
    next()
}
// 进入商户路由之前处理
async function before_merchant (req, res, next) {
    res.where.userId = res.user.id
    next()
}
// 进入客户端路由之前处理
async function before_client (req, res, next) {
    for (let url of ['/user/login', '/user/register', '/order/query', '/order/status', '/merchant/system', '/order/pay/success']) {
        if (url === req.path) {
            return next()
        }
    }

    res.where.userId = 0
    try {
        console.log(req.headers.link)
        let Merchant = await merchant.findOne({
            where: {
                link: req.headers.link,
            }
        })
        if (Merchant) { res.where.userId = Merchant.userId } else { next('获取link失败') }
        next()
    } catch (error) {
        res.result.msg = '获取link失败'
        next(error)
    }


}



async function handle_error (err, req, res, next) {
    let msg = '参数错误'
    console.log(err)
    try {
        console.log(err.errors[0].message)
        msg = err.errors[0].message
    } catch (err) {
        msg = err
    }



    res.send({
        code: 20,
        err: err,
        msg: msg,
        body: req.body,
    })
}







// 参数	类型	说明	备注
// code	Number	结果码	成功=1
// 失败=-1
// 未登录=401
// 无权限=403
// showMsg	String	显示信息	系统繁忙，稍后重试
// errorMsg	String	错误信息	便于研发定位问题
// data	Object	数据	JSON 格式