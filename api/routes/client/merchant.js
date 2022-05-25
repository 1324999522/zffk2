const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { merchant } = models
const { image_upload } = require('../../service/util/multer')

router.get('/', (req, res, next) => {
    req.query = {}
    req.query.id = res.where.userId
    next()
}, base(merchant).$get)

router.get('/system', (req, res, next) => {


    res.result.data = {
        default_link: global.$Config.link,
        ali_pay_show: global.$Config.collect.ali_pay.show,
        wx_pay_show: global.$Config.collect.wx_pay.show,
        baidu_cookie: global.$Config.baidu_cookie,
        directLoginApp: global.$Config.directLoginApp,
        directLoginAppUrl: global.$Config.directLoginAppUrl
    }
    res.result.msg = 'ok'
    next()

    next()
})


module.exports = router







