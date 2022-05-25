const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { user, role, popedom } = models


router.get('/all', async (req, res, next) => {
    res.include = {
        model: popedom,
        where: {
            pid: 0,
            
        },
        required: false
    }
    next()
}, base(role).$get_page, async (req, res, next) => {
    // 获取子权限


    for (let Role of res.result.data.rows) {
        for (let Popedom of Role.popedoms) {
            Popedom.dataValues.children = await popedom.get_children(Popedom.id)
        }
    }
    next()
})


router.delete('/', base(role).$delete)
router.delete('/many', base(role).$delete_many)
router.post('/', post)

router.get('/', (req, res, next) => {
    res.include = {
        model: popedom,

    }
    next()
}, base(role).$get, async (req, res, next) => {

    let popedoms = res.result.data.popedoms.map(i => {
        return i.id

    })
    res.result.data.dataValues.popedoms_id = popedoms
    next()
})

router.put('/', put)


async function post(req, res, next) {
    try {
        let Role = await role.create(req.body)
        let Popedoms = await popedom.findAll()
        Role.addPopedoms(Popedoms)

        res.result.data = Role
        res.result.msg = '添加成功'
        next()
    } catch (e) { next(e) }
}


async function put(req, res, next) {
    try {
        let { popedoms_id } = req.body
        let Popedoms = await popedom.findAll({ where: { id: popedoms_id } })
        let Role = await role.findByPk(req.body.id)
        Role.setPopedoms(Popedoms)

        let data = await role.update(req.body, { where: { id: req.body.id } })
        res.result.data = data
        res.result.msg = '修改成功'
        next()
    } catch (e) { next(e) }
}



module.exports = router






