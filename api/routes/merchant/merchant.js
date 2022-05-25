const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { merchant, order } = models
const { image_upload } = require('../../service/util/multer')


async function before_merchant (req, res, next) {
    req.query = {}
    req.query.id = res.where.userId
    next()
}


router.get('/', before_merchant, base(merchant).$get)
router.put('/', before_merchant, base(merchant).$put)


router.post('/portrait', image_upload, (req, res, next) => {
    res.result.data = res.image
    res.result.msg = '上传成功'
    next()
})


router.get('/summary', before_merchant, base(merchant).$get, async (req, res, next) => {
    try {
        let data = await merchant.findByPk(res.user.id)
        data.dataValues.username = '123456'
        data.dataValues.domain_name = global.$Config.domain
        data.dataValues.portrait = '123456'
        
        // let { balance } = res.result.data
       // data.balance = 0
        res.result.data = data
        next()
    } catch (e) { next(e) }

})



module.exports = router







