const express = require('express')
const router = express.Router()
const { sequelize, models, Op } = require('../../sequelize')
const { user,  merchant } = models


// 用户登录
router.post('/login', post_login)
// 用户注册
router.post('/register', post_register)


// 用户登录
async function post_login(req, res, next) {

    let { username, password } = req.body
    let result = await user.login(username, password)
    res.result = result
    next()
}

// 用户注册
async function post_register(req, res, next) {
    let { username, password } = req.body
    if (await user.check_repeat({ username })) {
        res.result.code = 4
        res.result.msg = '用户名已存在'
        next()
        return
    }


    let User = await user.register({ username, password, Roles: [7] })
    console.log(User)
    await merchant.create({
        id: User.id,
        userId: User.id,
        portrait: getPortraint(),
    })

    res.result.data = User
    next()
}



module.exports = router



// -----------------------------------------------------------








