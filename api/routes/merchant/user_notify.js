const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { notify } = models

router.get('/page', base(notify).$get_page)
router.get('/all', base(notify).$get_all)
router.get('/', base(notify).$get)
router.put('/', base(notify).$put)
router.delete('/', base(notify).$delete)
router.delete('/many', base(notify).$delete_many)
router.post('/', base(notify).$post)



module.exports = router







