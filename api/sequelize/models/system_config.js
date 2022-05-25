const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class system_config extends Model {

    }

    system_config.init(
        {
            system_configname: { type: DataTypes.STRING, allowNull: true },
            value: { type: DataTypes.STRING(2000), allowNull: true },
            key: { type: DataTypes.STRING, allowNull: true },
            data_type: { type: DataTypes.STRING, allowNull: true },
            value2: { type: DataTypes.STRING(1000), allowNull: true },
            value3: { type: DataTypes.STRING(1000), allowNull: true },
            value4: { type: DataTypes.STRING, allowNull: true },
            value5: { type: DataTypes.STRING, allowNull: true },
            status: { type: DataTypes.INTEGER, allowNull: true },

        }, { sequelize, modelName: 'system_config' })
};




