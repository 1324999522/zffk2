const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class good_type
        extends Model { }
    good_type.init(
        {
            good_typename: { type: DataTypes.STRING, allowNull: true, },
            status: { type: DataTypes.ENUM('销售中', '已下架'), allowNull: true, defaultValue: '销售中', },
            sort: { type: DataTypes.INTEGER, allowNull: true,defaultValue: 0  },
        }, { sequelize, modelName: 'good_type' })

};

