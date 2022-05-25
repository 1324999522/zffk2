const { DataTypes, Model } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {


  class notify extends Model { }
  notify.init(
    {

      content: { type: DataTypes.STRING, allowNull: true,},
      type: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
      title: { type: DataTypes.STRING, allowNull: true, },


    }, { sequelize, modelName: 'notify' })
};

