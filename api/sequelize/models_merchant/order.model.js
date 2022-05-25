
const { sequelize, Op, Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {

    let { capital, card, merchant } = sequelize.models


    class order
        extends Model {
        static create_order_number() {
            let myDate = new Date();
            return 'ZF' + myDate.getFullYear() + getMonth() + myDate.getDate() + createUUID(8)
        }
        static async getIdByOrderName(ordername) {
            let Order = await order.findOne({ where: { ordername: ordername } })
            return Order.id
        }
        static async getOrderByOrdername(ordername) {
            let Order = await order.findOne({ where: { ordername: ordername } })
            return Order
        }
        // 订单支付成功 处理 1.更新订单状态为已支付 2.增加商户余额 3.创建资金变动记录 4.提取卡密
        static async handle_success(ordername) {
            // 通过订单号获取订单实体
            let Order = await order.getOrderByOrdername(ordername)
            // 更新订单状态为已支付
            try {
                Order.status = '已支付'
                await Order.save()
            } catch { throw ('订单状态更新失败') }
            // // 增加商户余额
            // try {
            //     var Merchant = await merchant.findByPk(Order.userId)
            //     Merchant.balance = Merchant.balance + Order.orderPrice
            //     Merchant.save()
            // } catch { throw ('增加商户余额失败') }
            // // 创建资金变动记录
            // try {
            //     let Capital = await capital.create({
            //         reason: '商品交易',
            //         main_value: Order.ordername,
            //         value: Order.orderPrice,
            //         changed_money: Merchant.balance,
            //         userId: Order.userId
            //     })
            // } catch (err) { console.log(err); throw ('创建资金变动记录失败') }
            // 提取卡密失败
            try {
                setInterval(async () => {
                    let { msg, code, data } = await card.takeCard(Order)
                    if (code === 0) { }
                }, 50);

            } catch { throw ('提取卡密失败') }
        }

        static async getSumToday(userId) {

            let today = new Date(new Date().setHours(0, 0, 0, 0));

            let Order = await this.findOne({
                where: {
                    sendCardStatus: 1,
                    userId: userId,
                    createdAt: {
                        [Op.gt]: today,
                    }
                },
                attributes: {
                    include: [
                        [sequelize.fn('SUM', sequelize.col('orderPrice')), 'orderPriceSumToday'],
                        [sequelize.fn('COUNT', sequelize.col('orderPrice')), 'orderCountToday']
                    ]
                }
            })

            let { orderPriceSumToday, orderCountToday } = Order.dataValues
            return { orderPriceSumToday, orderCountToday }
        }
        static async getSumAll(userId) {

            let Order = await this.findOne({
                where: {
                    // createdAt: where.createdAt,
                    sendCardStatus: 1,
                    userId: userId,
                },
                attributes: {
                    include: [
                        [sequelize.fn('SUM', sequelize.col('orderPrice')), 'orderPriceSumAll'],
                        [sequelize.fn('COUNT', sequelize.col('orderPrice')), 'orderCountAll']
                    ]
                }
            })

            let { orderPriceSumAll, orderCountAll } = Order.dataValues
            return { orderPriceSumAll, orderCountAll }
        }

        static async getSum(userId) {
            let { orderPriceSumAll, orderCountAll } = await this.getSumAll(userId)
            let { orderPriceSumToday, orderCountToday } = await this.getSumToday(userId)
            return { orderPriceSumAll, orderCountAll, orderPriceSumToday, orderCountToday }

        }
        static async create_qrcode(url, name) {
            return new Promise((resolve, reject) => {
                let qr = require('qr-image');
                let fs = require('fs');


                let img = qr.image(url, { size: 40 });
                let ss = fs.createWriteStream(`./public/qr_code/${name}.png`);
                img.pipe(ss)

                setTimeout(() => {
                    resolve(`/api/public/qr_code/${name}.png`)
                }, 100)
            })


        }



    }
    order.init(
        {
            ordername: { type: DataTypes.STRING, allowNull: true, },
            count: {
                type: DataTypes.INTEGER, allowNull: true, validate: {
                    min: 1,
                    isInt: true,
                }
            },
            sendCardStatus: { type: DataTypes.ENUM('已发货', '未发货'), allowNull: true, defaultValue: '未发货' },
            contact: { type: DataTypes.STRING, allowNull: true, },
            payNo: { type: DataTypes.STRING, allowNull: true, },
            payMode: { type: DataTypes.ENUM('手动提卡', '手工订单', '支付宝', '微信支付', 'qq钱包'), allowNull: true, },
            // 订单金额
            orderPrice: {
                type: DataTypes.DOUBLE(11, 2), allowNull: true, defaultValue: 0, validate: {
                    min: 0,
                }
            },

            // 实际所得
            real_price: {
                type: DataTypes.DOUBLE(11, 2), allowNull: true, defaultValue: 0, validate: {}
            },
            status: { type: DataTypes.ENUM('已支付', '未支付'), allowNull: true, defaultValue: '未支付' },
            ip: { type: DataTypes.STRING, allowNull: true, },
            pay_id: { type: DataTypes.STRING, allowNull: true, },
            city: { type: DataTypes.STRING, allowNull: true, },
            mobile: { type: DataTypes.STRING, allowNull: true, },

            // increase: { type: DataTypes.DOUBLE, allowNull: true, },
        }, { sequelize, modelName: 'order' })



};

function createUUID(len, radix) {
    var chars = '0123456789'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0;i < len;i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    }
    return uuid.join('');
}

function getMonth() {
    let month = new Date().getMonth() + 1
    if (month < 10) {
        return '0' + month
    } else { return month }
}
function get_letter(count) {

    let str = ''
    function one() {
        let b = Math.random() * 26
        let d = Math.round(b)
        let str = 'abcdefghijklmnopqrstuvwsyzasdsabxbe'
        d = d + 1
        let f = str.slice(d, d + 1)
        return f
        // .toUpperCase()
    }
    for (let i = 0;i < count;i++) {
        str = str.concat(one())
    }

    return str

}




