const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const fs = require('fs')
var path = require('path')

const { mysql } = require("../config")
const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
  host: mysql.host,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
  pool: {   //连接池设置
    max: 100, //最大连接数
    min: 0, //最小连接数
    idle: 10000
  },
  logging: false,
  timezone: '+08:00',
  define: {
    timestamps: true,
  },
  // 添加这个配置 date
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
})
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'sequelize/database.sqlite',
//   logging: false,
// })


// 读取模型路径

function loading_models (folder_path) {
  let models_path = fs.readdirSync(path.join(__dirname, folder_path))
  // 加载模型
  for (const model_path of models_path) {
    require(`${folder_path}/${model_path}`)(sequelize)
  }
}
// 加载用户模型
loading_models('./models')
// 加载商户模型
loading_models('./models_merchant')


// 测试数据库连接是否正常
let sy = async () => {
  try {
    await sequelize.authenticate()
    // console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connet to the database:', error)
    return
  }



  //await sequelize.sync({ force:  })



  //await sequelize.sync({ alter: true })

  const { user } = sequelize.models

  // =====================================================
  user.findByPk(1).then(async res => {
    const User = {
      username: 'admin',
      password: '123456',
      balance: 0
    }

    if (!res) {
      const AdminUser = await user.create(User)
      const Merchant = await merchant.create({
        userId: AdminUser.id,
        merchant_title: "测试店铺",
        link: "769920",
        contact: 'qq211133322'
      })
      const Notify = await notify.create({
        content: "欢迎来到发卡网后台管理系统",
        title: "管理员，你好",
        userId: AdminUser.id
      })
      const GoodType = await good_type.create({
        good_typename: "示例分类1",
        userId: AdminUser.id
      })
      const GoodType2 = await good_type.create({
        good_typename: "example one",
        userId: AdminUser.id
      })
      const Good = await good.create({
        goodname: "示例商品1",
        goodTypeId: 1,
        price: 1.5,
        userId: AdminUser.id
      })
      const Good2 = await good.create({
        goodname: "example goods one",
        goodTypeId: 1,
        price: 3,
        userId: AdminUser.id
      })
      const Good5 = await good.create({
        goodname: "other",
        goodTypeId: 2,
        price: 2,
        userId: AdminUser.id
      })
      const Good3 = await good.create({
        goodname: "示例商品2",
        goodTypeId: 1,
        price: 5,
        userId: AdminUser.id
      })
      const Good4 = await good.create({
        goodname: "example goods two",
        goodTypeId: 2,
        price: 0.5,
        userId: AdminUser.id
      })

    }
  })


}
sy()
// =====================================================

// 关联
const { popedom, role, user, api_log } = sequelize.models

popedom.belongsToMany(role, { through: 'rolepopedom' });
role.belongsToMany(popedom, { through: 'rolepopedom' });
role.belongsToMany(user, { through: 'userrole' });
user.belongsToMany(role, { through: 'userrole' });
api_log.belongsTo(popedom)
api_log.belongsTo(user)
// =====================================================
const { good, card, good_type, order, merchant, capital, wholesale, notify } = sequelize.models

for (const key in { good, card, good_type, order, merchant, capital, wholesale, notify }) {
  sequelize.models[key].belongsTo(user)
  user.hasMany(sequelize.models[key])
}

good.belongsTo(good_type)
card.belongsTo(good_type)
order.belongsTo(good_type)

wholesale.belongsTo(good)

good_type.hasMany(good)
good.hasMany(card)
good.hasMany(wholesale)
order.hasMany(card)

card.belongsTo(good)
card.belongsTo(order)
order.belongsTo(good)

capital.belongsTo(merchant)









module.exports = {
  sequelize,
  models: sequelize.models,
  Op,
}










// https://blog.csdn.net/kong0csd/article/details/84128910













// const sequlie = new Seqelize(databese, userName, passWord, {
//   host: hot,
//   dialect: "msql",
//   logging: false,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   timezone: "+08:00",
//   define: {
//     timestamps: true,
//   },
//   // 添加这个配置
//   dialectOptions: {
//     dateStrings: true,
//     typeCast: true
//   },

// })

