

module.exports = base = function (model) {
    return {
        $get_page: async function (req, res, next) {
            let { offset, limit } = req.query



            if (!offset) offset = 1
            if (!limit) limit = 100000
            offset = Number(offset)
            limit = Number(limit)

            let options = {
                offset: (offset - 1) * limit,
                limit,
            }
            if (Boolean(res.attributes)) options.attributes = res.attributes
            if (Boolean(res.include)) options.include = res.include
            if (Boolean(res.order)) options.order = res.order
            if (JSON.stringify(res.where) !== "{}" && res.where !== "{}") options.where = res.where
  
            try {
                let data = await model.findAndCountAll(options)
                res.result.data = data
                next()
            } catch (e) { next(e) }
        },
        $delete: async function (req, res, next) {
            res.where.id = req.body.id
            try {
                let data = await model.destroy({ where: res.where })
                res.result.data = data
                res.result.msg = '删除成功'
                next()
            } catch (e) { next(e) }
        },
        $get: async function (req, res, next) {
            let { id } = req.query
            res.where.id = id
            let options = {
                where: res.where
            }
            if (Boolean(res.attributes)) options.attributes = res.attributes
            if (Boolean(res.include)) options.include = res.include
            try {

                let data = await model.findOne(options)
                res.result.data = data
                next()
            } catch (e) { next(e) }
        },
        $get_all: async function (req, res, next) {

            let options = {
                where: res.where
            }
            if (Boolean(res.include)) options.include = res.include
            try {

                let data = await model.findAll(options)
                res.result.data = data
                next()
            } catch (e) { next(e) }
        },
        $put: async function (req, res, next) {
            res.where.id = req.body.id
            console.log(res.where)
            try {
                let data = await model.update(req.body, { where: res.where })
                res.result.data = data
                res.result.msg = '保存成功'
                next()
            } catch (e) { next(e) }
        },
        $post: async function (req, res, next) {
            req.body.userId = res.where.userId
            try {
                let data = await model.create(req.body)
                res.result.data = data
                res.result.msg = '添加成功'
                next()
            } catch (e) { next(e) }
        },
        $delete_many: async function (req, res, next) {
            res.where.id = req.body.id
            try {
                let data = await model.destroy({ where: res.where })
                res.result.data = data
                res.result.msg = '批量删除成功'
                next()
            } catch (e) { next(e) }
        }


    }

}








