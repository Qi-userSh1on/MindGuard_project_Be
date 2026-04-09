'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init({
    date: DataTypes.DATE,
    tidur_jam: DataTypes.INTEGER,
    minum_gelas: DataTypes.INTEGER,
    olahraga_jam: DataTypes.INTEGER,
    istirahat_jam: DataTypes.INTEGER,
    status: DataTypes.STRING,
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};