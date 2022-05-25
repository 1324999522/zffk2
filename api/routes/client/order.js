const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { order, good, card, merchant, capital } = models


const { create_pay, verify_success } = require('../../service/pay')

//                   客户端创建订单
// 接收参数 { count, goodId, payMode };返回 Order对象
router.post('/create', before_post_creare, base(order).$post, after_post_create)

//                   客户端查询订单
// 接收参数 { ordername };返回 Order对象include Cards数组
router.get('/query', before_get_all, before_get_query, after_get_query)

//                   检测订单状态
// 接收参数 { ordername };返回 code为0表示已支付
router.get('/status', before_get_all, after_get_status)

// 支付成功,异步通知地址
router.post('/pay/success', async (req, res, next) => {

    try {
        console.log(req.body)

        let verify = verify_success(req.body)
        console.log('验签结果：')
        console.log(verify)
        if (!verify) return next('验签失败')



        // 未验证
        let ordername = req.body.out_trade_no


        const Order = await order.getOrderByOrdername(ordername)
        const Good = await good.findByPk(Order.dataValues.goodId)
        let { total_amount } = req.body
        total_amount = Number(total_amount)

        if (total_amount + 0.1 < (Good.price * Order.dataValues.count)) return next('价格不符')

        // 订单支付成功处理
        order.handle_success(ordername)
        res.send('success')
    } catch (e) { console.log(e) }

})

router.post('/page', (req, res, next) => {

    let { ordernames } = req.body
    res.where.ordername = ordernames
    res.attributes = {
        include: [
            [
                sequelize.literal(`(
                    SELECT good.goodname
                    FROM goods AS good
                    WHERE
                        order.goodId = good.id
                  )`), 'goodname'
            ],
        ]
    }

    res.order = [
        ['id', 'DESC'],
    ]
    req.query = req.body
    next()
}, base(order).$get_page)

async function before_get_all (req, res, next) {
    const { ordername } = req.query
    if (!ordername) return next('请输入订单号')
    try {
        res.result.data = await order.getOrderByOrdername(ordername)
        if (!res.result.data) return next('订单号不存在')
        next()
    } catch {
        next('查询订单失败')
    }
}
async function before_get_query (req, res, next) {

    let Order = res.result.data

    let Good = await Order.getGood()
    Order.cards = await Order.getCards()
    Order.dataValues.cards = await Order.getCards()
    Order.dataValues.goodname = Good.goodname
    next()

}

async function after_get_query (req, res, next) {
    let Order = res.result.data


    Order.dataValues.cards_string = card.Array_to_String(Order.cards)
    res.result.data = Order
    next()
}

async function after_get_status (req, res, next) {
    let Order = res.result.data
    res.result.data = null
    res.result.code = 4
    if (Order.sendCardStatus === '已发货') {
        res.result.code = 0
    }
    next()
}
async function before_post_creare (req, res, next) {

    let { count, goodId, payMode } = req.body

    let price = 1000
    try {
        // 获取本订单购买的商品
        let Good = await good.findOne({ where: { id: goodId, userId: res.where.userId } })
        price = Good.price
        res.result.Good = Good
        res.result.goodname = Good.goodname
        // 是否开启批发
        if (Good.wholesale_open === 1) {
            let discounted_price = await Good.get_discount(count)
            if (discounted_price) { price = discounted_price }
        }
    } catch { throw ('获取商品失败') }
    // 计算总价
    let orderPrice = Number((count * price).toFixed(2))
    // 整理订单基本信息
    let Order = {
        count,
        goodId,
        payMode,  //支付方式
        ordername: order.create_order_number(), //订单号
        ip: res.client.ip, //客户端ip
        orderPrice: orderPrice
    }
    req.body = Order

    next()

}


async function after_post_create (req, res, next) {
    try {
        // 整理数据
        let Order = res.result.data
        Order.goodname = res.result.goodname

        // 获取商品名称
        Order.dataValues.goodname = res.result.goodname

        let create_pay_result = await create_pay({
            out_trade_no: Order.ordername,
            subject: '扫码购买',
            total_amount: Order.orderPrice,
            payMode: '支付宝'
        })
        console.log(create_pay_result)
        // 付款链接转二维码
        Order.dataValues.qrcode = await order.create_qrcode(create_pay_result.qr_code, Order.ordername)

        res.result.data = Order

        next()
    } catch (e) { next(e) }



}







































// 微信测试
const axios = require('axios')

async function wx_test (props) {
    let { ordername, createdAt, goodname, orderPrice } = props.Order

    let res = await axios({
        url: 'http://119.29.77.51:3000/w/card',
        method: 'get',
        params: {
            ordername,
            createdAt,
            goodname,
            orderPrice,
        }

    })
}

module.exports = router







