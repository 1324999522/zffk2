const { DataTypes, Model } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {


    class merchant extends Model { }
    merchant.init(
        {
            merchant_title: { type: DataTypes.STRING, allowNull: true, },
            merchant_foot: { type: DataTypes.STRING, allowNull: true, },
            merchant_describe: { type: DataTypes.STRING(2000), allowNull: true, },
            merchant_noticebar: { type: DataTypes.STRING(2000), allowNull: true, },
            contact: { type: DataTypes.STRING, allowNull: true, },
            portrait: { type: DataTypes.STRING, allowNull: true, },
            pc_template: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
            mobile_template: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 2 },
            pay_wechatpay: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
            pay_alipay: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
            status: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
            pay_qqWallet: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
            link: { type: DataTypes.STRING, allowNull: true, defaultValue: createUUID(6) },
            balance: { type: DataTypes.DOUBLE(11, 2), allowNull: true, defaultValue: 0 },
            merchant_describe_html: { type: DataTypes.STRING(3000), allowNull: true, },



        }, { sequelize, modelName: 'merchant' })
};

// https://yqfile.alicdn.com/img_bd1ef2517b9c1af65ad7b7eba16b9577.png
function createUUID (len, radix) {
    var chars = '0123456789'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    }
    return uuid.join('');
}