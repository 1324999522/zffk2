const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { popedom } = models


router.get('/all', (req, res, next) => {
    let { key_word } = req.query
    console.log(key_word)
    res.where = {
        popedomname: {
            [Op.like]: `%${key_word}%`
        }

    }
    req.query.where = res.where

    next()
}, base(popedom).$get_page, async (req, res, next) => {
    let Popedoms = res.result.data.rows
    for (let Popedom of Popedoms) {
        Popedom.dataValues.children = await popedom.get_children(Popedom.id)
    }
    res.result.data.rows = Popedoms
    next()
})

router.get('/all2', (req, res, next) => {

    res.where = {
        pid: 0
    }

    next()
}, base(popedom).$get_page, async (req, res, next) => {
    let Popedoms = res.result.data.rows
    for (let Popedom of Popedoms) {
        Popedom.dataValues.children = await popedom.get_children(Popedom.id)
    }
    res.result.data.rows = Popedoms
    next()
})

router.get('/', base(popedom).$get)
router.put('/', base(popedom).$put)
router.delete('/', base(popedom).$delete)
router.delete('/many', base(popedom).$delete_many)
router.post('/', base(popedom).$post)

module.exports = router







