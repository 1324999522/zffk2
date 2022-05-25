const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class wholesale extends Model {
        static async get_Wholesales(wholesales, price) {
            let wholesales_new = wholesales.map((i, index) => {
                if (i.price >= price || i.price === 0) {
                    throw (`批发设置的第${index+1}组的批发价格:'${i.price}',不能低于0且不能大于原价`)
                }

                if (i.id) {
                    wholesale.destroy({ where: { id: i.id } })
                    delete i.id
                }
                return i
            })
            const Wholesales = await wholesale.bulkCreate(wholesales_new);
            return Wholesales
        }
    }

    wholesale.init(
        {
            count: { type: DataTypes.INTEGER, allowNull: true },
            price: { type: DataTypes.DOUBLE(11,2), allowNull: true },
        }, { sequelize, modelName: 'wholesale' })
};


