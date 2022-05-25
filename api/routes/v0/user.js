const express = require('express')
const router = express.Router()
const base = require('../base')
const { sequelize, models, Op } = require('../../sequelize')
const { user, role, merchant } = models

// 用户修改自己资料
router.put('/me', put_me)

// 初始化一个用户
router.get('/initial', initial)


router.get('/all', (req, res, next) => {
    res.include = role
    next()
}, base(user).$get_page)

router.delete('/', base(user).$delete)
router.delete('/many', base(user).$delete_many)
router.get('/', get)
router.put('/', put)


// 获取一个用户
async function get(req, res, next) {
    let { id } = req.query
    try {
        let User = await user.findOne({
            where: {
                id
            },
            include: role
        })
        let roles = User.roles.map(i => {
            return i.id
        })
        User.dataValues.roleId = roles
        res.result.data = User
        next()
    } catch (e) { next(e) }
}

// 用户资料修改
async function put(req, res, next) {
    try {
        let { roleId } = req.body
        let Roles = await role.findAll({ where: { id: roleId } })
        let User = await user.findByPk(req.body.id)
        User.setRoles(Roles)

        let data = await user.update(req.body, { where: { id: req.body.id } })
        res.result.data = data
        next()
    } catch (e) { next(e) }
}
// 用户修改自己资料
async function put_me(req, res, next) {
    try {
        let { headPortrait, sign, sex } = req.body
        let data = await user.update({
            headPortrait, sign, sex
        }, { where: res.user.id })

        res.result.data = data
        next()
    } catch (e) { next(e) }
}

// 初始化一个用户
async function initial(req, res, next) {
    let User = await user.create({
        username: 'admin',
        password: '123456'
    })
    res.result.data = User
    next()
}


// -----------------------------------------------------------


module.exports = router



// -----------------------------------------------------------








