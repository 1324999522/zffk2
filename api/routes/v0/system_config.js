const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { system_config } = models

router.get('/page', base(system_config).$get_page)
router.get('/all', base(system_config).$get_all)
router.get('/', base(system_config).$get)
router.put('/', base(system_config).$put)
router.delete('/', base(system_config).$delete)
router.delete('/many', base(system_config).$delete_many)
router.post('/', base(system_config).$post)

module.exports = router







