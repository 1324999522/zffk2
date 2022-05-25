const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class api_log extends Model {
        /**
        * 获取用户拥有的权限对象列表
        * @param {Object} req 请求对象
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
    }

    api_log.init(
        {
            api_logname: { type: DataTypes.STRING, allowNull: true },
            status: { type: DataTypes.INTEGER, allowNull: true },
            path: { type: DataTypes.STRING, allowNull: true },
            method: { type: DataTypes.STRING, allowNull: true },
            msg: { type: DataTypes.STRING, allowNull: true },
            msg2: { type: DataTypes.STRING, allowNull: true },
            ip: { type: DataTypes.STRING, allowNull: true },

        }, { sequelize, modelName: 'api_log' })
};



