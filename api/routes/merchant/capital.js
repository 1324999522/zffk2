const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { capital } = models

router.get('/page', base(capital).$get_page)
router.get('/all', base(capital).$get_all)
router.get('/', base(capital).$get)
router.put('/', base(capital).$put)
router.delete('/', base(capital).$delete)
router.delete('/many', base(capital).$delete_many)
router.post('/', base(capital).$post)

module.exports = router







