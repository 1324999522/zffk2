const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { good, wholesale } = models

// 分页获取商品
router.get('/page', (req, res, next) => {
    let { goodTypeId, status } = req.query
    if (goodTypeId) res.where.goodTypeId = goodTypeId
    if (status) res.where.status = status
    // 子查询获取每个商卡密使用情况 和商品分类名称
    res.attributes = {
        include: [
            [
                // Note the wrapping parenthese in the call below!
                sequelize.literal(`(
                SELECT COUNT(*)
                FROM cards AS card
                WHERE
                    card.goodId = good.id
                    and
                    card.status = '0'
              )`), 'use'
            ],
            [
                sequelize.literal(`(
            SELECT COUNT(*)
            FROM cards AS card
            WHERE
            card.goodId = good.id
          )`), 'count'
            ]
            ,
            [
                sequelize.literal(`(
            SELECT COUNT(*)
            FROM cards AS card
            WHERE
            card.goodId = good.id  and card.status = '1'
          )`), 'noUse'
            ]
            ,
            [
                sequelize.literal(`(
            SELECT good_type.good_typename
            FROM good_types AS good_type
            WHERE
                good.goodTypeId = good_type.id
          )`), 'good_typename'
            ]
        ]
    }
    next()
}, base(good).$get_page)

// 获取全部商品
router.get('/all', (req, res, next) => {
    let { goodTypeId, status } = req.query
    if (goodTypeId) res.where.goodTypeId = goodTypeId
    if (status) res.where.status = status
    next()
}, base(good).$get_all)

// 获取单个商品
router.get('/', (req, res, next) => {
    res.include = {
        model: wholesale
    }
    next()
}, base(good).$get)

// 更新商品
router.put('/', base(good).$put, async (req, res, next) => {

    try {
        let { wholesales } = req.body
        let Good = await good.findOne({ where: res.where })
        const Wholesales = await wholesale.get_Wholesales(wholesales,Good.price)
        Good.setWholesales(Wholesales)
    } catch (err) { next(err) }


    res.result.msg = '商品更新成功'
    next()
})
// 删除商品
router.delete('/', base(good).$delete)
// 批量删除商品
router.delete('/many', base(good).$delete_many)
// 添加商品
router.post('/', base(good).$post)



module.exports = router







