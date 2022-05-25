const { DataTypes, Model } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {



    class capital extends Model { }
    capital.init(
        {
            capitalname: { type: DataTypes.STRING, allowNull: true },
            reason: { type: DataTypes.STRING, allowNull: true },
            value: { type: DataTypes.DOUBLE(11, 2),  },
            mobile_value: { type: DataTypes.DOUBLE(11, 2),  },
            main_value: { type: DataTypes.STRING, allowNull: true, },
            changed_money: { type: DataTypes.DOUBLE(11, 2),  },


        }, { sequelize, modelName: 'capital' })
};

