const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { order, card } = models

router.get('/page', (req, res, next) => {
    res.order = [
        ['id', 'DESC'],
    ]
    res.attributes = {
        include: [
            [
                sequelize.literal(`(
                    SELECT good.goodname
                    FROM goods AS good
                    WHERE
                        order.goodId = good.id
                  )`), 'goodName'
            ],
        ]
    }
    next()
}, base(order).$get_page)
router.get('/all', base(order).$get_all)
router.get('/', base(order).$get)
router.put('/', base(order).$put)
router.delete('/', base(order).$delete)
router.delete('/many', base(order).$delete_many)


router.post('/hand/takeCard', (req, res, next) => {
    req.body.ordername = order.create_order_number()
    req.body.payMode = "手工订单"
    req.body.ip = res.client.ip
    console.log(res.ip)
    next()
}, base(order).$post, async (req, res, next) => {
    // 获取卡密
    let Order = res.result.data
    let { code, msg, cards } = await card.takeCard(Order)
    if (code !== 0) {
        return next({ errors: [{ message: msg }] })
    } else {
        // 更新订单状态
        Order.sendCardStatus = 1
        Order.orderPrice = 1
        await Order.save()
        res.result.msg = '卡密提取成功'

        next()
    }


})














module.exports = router








