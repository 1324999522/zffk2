const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { good_type } = models

router.get('/page', (req, res, next) => {
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
}, base(good_type).$get_page)
router.get('/all', base(good_type).$get_all)
router.get('/', base(good_type).$get)
router.put('/', base(good_type).$put)
router.delete('/', base(good_type).$delete)
router.delete('/many', base(good_type).$delete_many)
router.post('/', base(good_type).$post)



module.exports = router







