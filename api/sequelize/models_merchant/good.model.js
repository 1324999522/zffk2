const { DataTypes, Model } = require('sequelize');
const { cat } = require('tencentcloud-sdk-nodejs');

module.exports = (sequelize) => {

    class good extends Model {
        async get_discount(count) {
            let price = null
            try {
                const wholesales = await this.getWholesales()
                for (const wholesale of wholesales) {
                    if (count >= wholesale.count) {
                        price = wholesale.price
                    }
                }
                return price

            } catch { throw ('获取折扣信息失败') }

        }
    }
    good.init(
        {
            goodname: {
                type: DataTypes.STRING, allowNull: false,
                validate: {
                    len: {
                        args: [1, 100],
                        msg: '商品名称长度不能小于2或者大于100'
                    },
                    notIn: [['']],
                    notNull: true,
                }
            },
            status: { type: DataTypes.ENUM('销售中', '已下架'), allowNull: true, defaultValue: '销售中', },
            price: {
                type: DataTypes.DOUBLE(11, 2), allowNull: false, defaultValue: 1,
                validate: {
                    isNumeric: true,
                    notNull: true,
                    min: 0.01,
                    max: 1000,
                }
            },
            message: { type: DataTypes.STRING, allowNull: true, },
            describe: { type: DataTypes.STRING, allowNull: true, },
            sort: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
            full: { type: DataTypes.INTEGER, allowNull: true, },
            fullPrice: {
                type: DataTypes.DOUBLE(11, 2), allowNull: true, defaultValue: 10,
                validate: {
                    isNumeric: true,
                    min: 0.1,
                    max: 1000,
                }
            },
            isFull: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },

            limit_buy_type: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
            // 0 不限购 1 普通限购 2严格限购
            limit_buy_count: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1000 },
            limit_buy_count_less: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
            describe: { type: DataTypes.STRING(8000), allowNull: true, },
            img: { type: DataTypes.STRING, allowNull: true, },
            wholesale_open: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },




        }, { sequelize, modelName: 'good' })

};

// get_tx_cms()




// async function get_tx_cms(){
//     let res = await global.$axios({
//         url:'https://aaaasf-9g3nfe78f4aabd2e-1259155605.ap-shanghai.service.tcloudbase.com/rest_api/v1.0/ac',
//     })
//     console.log(res.data)
// }