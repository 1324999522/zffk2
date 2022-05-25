const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { card, good, order } = models
const fs = require('fs')
var path = require('path')
const zlib = require('zlib')

router.get('/page', async (req, res, next) => {
    let { goodId, status, ordername } = req.query
    if (goodId) res.where.goodId = goodId
    res.where.status = status

    try {
        if (ordername) {
            res.where.orderId = await order.getIdByOrderName(ordername)
            delete res.where.status
            delete res.where.goodId
        }
    } catch { res.result.msg = '订单号不存在!'; res.result.code = 4 }

    next()
}, base(card).$get_page)

router.get('/all', base(card).$get_all)
router.get('/', base(card).$get)
router.put('/', base(card).$put)
router.delete('/', base(card).$delete)
router.delete('/many', base(card).$delete_many)

// 添加卡密方法
router.post('/', async (req, res, next) => {

    try {

        // let { isRepeat, cards } = req.body


        // console.log(req.body)


        // if (cards.length === 0) return res.send({ no: 20, data: 'err', msg: '卡密数量为空', body: req.body, })
        // let cardNumbers = []

        // // 添加上userId
        // req.body.cards = req.body.cards.map(i => {
        //     return {
        //         cardNumber: i.cardNumber,
        //         goodId: i.goodId,
        //         userId: res.where.userId,
        //     }
        // })
        // // 去重复
        // if (isRepeat) {
        //     let goodId = req.body.cards[0].goodId
        //     cardNumbers = req.body.cards.map(i => i.cardNumber)
        //     let Cards = await card.findAll({
        //         where: {
        //             cardNumber: cardNumbers,
        //             goodId: goodId,
        //         }
        //     })
        //     for (let c of Cards) {
        //         cardNumbers.remove(c.cardNumber);
        //     }
        //     cardNumbers = cardNumbers.map(i => {
        //         return {
        //             cardNumber: i,
        //             goodId: goodId,
        //         }
        //     })
        //     res.result.msg = `本次成功上传卡密数量${cardNumbers.length}`
        //     if (Cards.length > 0) res.result.msg = `本次成功上传卡密数量${cardNumbers.length},已存在重复卡密数量${Cards.length}`
        // } else {
        //     cardNumbers = req.body.cards
        //     res.result.msg = `本次成功上传卡密数量${cardNumbers.length}`
        // }


        let { cardNumbers, isRepeat, goodId } = req.body

        const Cards = cardNumbers.map(i => {
            return {
                cardNumber: i,
                goodId: goodId,
                userId: res.where.userId,
            }
        })



        let result = await card.bulkCreate(Cards)

        res.result.msg = `本次成功上传卡密数量${cardNumbers.length}`
        res.result.data = result
        next()
    } catch (e) { next(e) }

})


//卡密导出接口
router.get('/export', async (req, res, next) => {
    // let { status } = req.body.where
    // let { goodName } = req.body

    let { goodId, status } = req.query
    if (goodId) res.where.goodId = goodId
    res.where.status = status

    let Good = await good.findByPk(goodId)

    let Cards = await card.findAll({ where: res.where })
    if (!(Boolean(Cards))) { return res.result.msg = '导出失败'; res.result.code = 4; next() }
    let str1 = ''
    var myDate = new Date();
    let fileName = ''
    Cards.forEach((card) => {
        let str = card.cardNumber.replace(/[\r\n]/g, '') //清除换行
        str = str.replace(/\ +/g, '') //清除空格
        str1 = str1.concat(str + "\r\n")
        fileName = `/public/down/${Good.goodname}--${Cards.length}个--${Boolean(Number(status)) ? '未卖出' : '已卖出'}--${myDate.getTime()}`
    })


    fs.writeFile(`.${fileName}.txt`, str1, (err) => {
        if (!err) {
            const inp = fs.createReadStream(`.${fileName}.txt`) // 创建可读的流
            // 通过fs文件系统将 data 中的内容写进去
            const out = fs.createWriteStream(`.${fileName}.txt.gz`) //创建可写的流
            const gzip = zlib.createGzip()
            inp.pipe(gzip).pipe(out)

            res.result.data = `/api${fileName}.txt.gz`
            res.result.msg = 'fs write suceess'
            next()

        } else {
            res.result.msg = 'fs write err'
            res.result.code = 4
            next()
        }
    })

    // 10秒后删除文件
    setTimeout(() => {
        fs.unlink(`.${fileName}.txt`, (err) => {
            console.log(err)
        })
        fs.unlink(`.${fileName}.txt.gz`, (err) => {
            console.log(err)
        })
    }, 10000)


})


module.exports = router







