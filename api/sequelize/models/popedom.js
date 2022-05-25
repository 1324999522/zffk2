const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class popedom extends Model {
        // 获取权限的两层子权限
        static async get_children(popedom_id) {
            let Popedoms = await popedom.findAll({
                where: {
                    pid: popedom_id
                }
            })
            for (let Popedom2 of Popedoms) {
                let Popedoms3 = await popedom.findAll({
                    where: {
                        pid: Popedom2.id
                    }
                })
                Popedom2.dataValues.children = Popedoms3
            }
            return Popedoms
        }

    }

    popedom.init(
        {
            popedomname: { type: DataTypes.STRING, allowNull: true },
            popedomfatherid: { type: DataTypes.INTEGER, allowNull: true },
            path: { type: DataTypes.STRING, allowNull: true },
            method: { type: DataTypes.STRING, allowNull: true },
            status: { type: DataTypes.INTEGER, allowNull: true },
            pid: { type: DataTypes.INTEGER, allowNull: true },

        }, { sequelize, modelName: 'popedom' })
};



