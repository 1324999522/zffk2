const { DataTypes, Model } = require('sequelize');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require("../../config")
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {

    class user extends Model {
        static async find() {
            let User = await user.findOne({
                where: { username: 'admin' },
            })
            return User;
        }

        static login = login
        static register = register
        static check_repeat = check_repeat
        /**
        * 获取用户拥有的权限对象列表
        * @return {Array} popedom对象数组
        */
        async getPopedoms() {
            let Roles = await this.getRoles()
            let popedoms = []
            for (let Role of Roles) {
                let popedom = await Role.getPopedoms()
                popedoms = popedoms.concat(popedom)
            }
            return popedoms
        }
        /**
        * 验证用户请求是否合法
        * @param {Array} popedoms 对象数组
        * @param {Object} req 请求对象
        * @return {Object} 返回验证结果boolean和popedom对象
        */
        static authentication(popedoms, req) {

            let path = req.path
            let method = req.method
            let flag = false
            let popedom = null
            for (let popedom of popedoms) {
                if (popedom.method === method && popedom.path === path) {
                    flag = true
                    return { flag, popedom }

                }
            }
            return { flag, popedom }
        }
        static verify(token) {
            return new Promise(function (resolve, reject) {
                // if (!token) return res.send({ msg: '无权限访问' })
                jwt.verify(token, JWT_SECRET_KEY, (err, data) => {
                    resolve(data)
                    reject(err)
                })

            })
        }



    }

    user.init(
        {
            username: { type: DataTypes.STRING, allowNull: false },
            nickname: { type: DataTypes.STRING, allowNull: true, defaultValue: 'null', },
            password: { type: DataTypes.STRING, allowNull: false },
            headPortrait: { type: DataTypes.STRING, allowNull: true },
            sign: { type: DataTypes.STRING, allowNull: true },
            // birthday: { type: DataTypes.DA, allowNull: true, },
            sex: { type: DataTypes.STRING, allowNull: true, defaultValue: 'male', },
            // 1.male 0.female
            phone: { type: DataTypes.STRING, allowNull: true, },
            qq: { type: DataTypes.STRING, allowNull: true, },
            // pid: { type: DataTypes.INTEGER, allowNull: true,defaultValue: 0, },
            wechat: { type: DataTypes.STRING, allowNull: true, },
            email: { type: DataTypes.STRING, allowNull: true, },
            is_vip: { type: DataTypes.STRING, allowNull: true, },
            vip: { type: DataTypes.DATE, allowNull: true, },
            tb_age: { type: DataTypes.DOUBLE(11, 1), allowNull: true, defaultValue: 0, },
            balance: { type: DataTypes.DOUBLE(11, 2), allowNull: true, defaultValue: 0, },
            notice_count: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0, },
        }, { sequelize, modelName: 'user' })




    /**
    * 用户登录方法
    * @param {String} username 用户名
    * @param {String} password 密码
    * @return {Object} code=0 成功,code=1失败
    */
    async function login(username, password) {

        let User = await user.findOne({
            where: { username, password },
        })


        if (User) {
            let { id } = User.dataValues
            let user_type = 1
            token = jwt.sign({ username, id, user_type }, JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 * 1000 })
            return {
                code: 0,
                msg: '登录成功',
                token: token,
                username: username,
                id: id
            }
        } else {
            return {
                //res.json
                code: 1,
                msg: '登录失败 账号或者密码错误',
                username: username,
            }
        }
    }




    /**
    * 注册方法
    * @param {Object}  user 
    * @return {Object} user对象
    */
    async function register(props) {
        let { username, password, Roles } = props

        let User = await user.create({
            username,
            password,
        })
        if (Roles) { await User.setRoles(Roles) }


        return User

    }


    // 检查重复用户名注册
    async function check_repeat(props) {
        let { username } = props
        let User = await user.findOne({ where: { username } })
        if (User) return true
        return false

    }








};


// 其他
// @api: 提供给第三方使用的接口
// @author: 标明作者
// @param: 参数
// @return: 返回值
// @todo: 待办
// @version: 版本号
// @inheritdoc: 文档继承
// @property: 类属性
// @property-read: 只读属性
// @property-write: 只写属性
// @const: 常量
// @deprecated: 过期方法
// @example: 示例
// @final: 标识类是终态, 禁止派生
// @global: 指明引用的全局变量
// @static: 标识类、方法、属性是静态的
// @ignore: 忽略
// @internal: 限内部使用
// @license: 协议
// @link: 链接,引用文档等
// @see: 与 link 类似, 可以访问内部方法或类
// @method: 方法
// @package: 命名空间
// @since: 从指定版本开始的变动
// @throws: 抛出异常
// @uses: 使用
// @var: 变量
// @copyright: 版权声明

// https://yqfile.alicdn.com/img_bd1ef2517b9c1af65ad7b7eba16b9577.png

