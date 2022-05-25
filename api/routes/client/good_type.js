const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { good_type, good,wholesale } = models

router.get('/all', (req, res, next) => {
    res.where.status = '销售中'
    res.include = {
        model: good,
        include:wholesale,
        where: {
            status: '销售中'
        },
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                SELECT COUNT(*)
                FROM cards AS card
                WHERE
                card.goodId = goods.id  and card.status = '1'

                )`), 'noUse'
                ]
            ]
        }
    }
    res.attributes = {
        include: [
            [
                // Note the wrapping parenthese in the call below!
                sequelize.literal(`(
                SELECT COUNT(*)
                FROM goods AS good
                WHERE
                    good_type.id = good.goodTypeId
              )`), 'goods_count'
            ],
        ]
    }
    next()
}, base(good_type).$get_all)
router.get('/', base(good_type).$get)


module.exports = router







