const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class role extends Model {

    }

    role.init(
        {
            rolename: { type: DataTypes.STRING, allowNull: true },
            describe: { type: DataTypes.STRING, allowNull: true },
        }, { sequelize, modelName: 'role' })
};


