const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { api_log, popedom, user } = models


router.get('/all', (req, res, next) => {
    res.include = [popedom, user]
    res.order = [
        ['id', 'DESC'],
    ]
    next()
}, base(api_log).$get_page)
router.get('/', base(api_log).$get)
router.put('/', base(api_log).$put)
router.delete('/', base(api_log).$delete)
router.delete('/many', base(api_log).$delete_many)
router.post('/', base(api_log).$post)



module.exports = router







