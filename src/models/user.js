'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    ten_dang_nhap: DataTypes.STRING,
    email: DataTypes.STRING,
    mat_khau: DataTypes.STRING,
    anh_dai_dien: DataTypes.STRING,
    diem_xep_hang: DataTypes.INTEGER,
    thang: DataTypes.INTEGER,
    thua: DataTypes.INTEGER,
    hoa: DataTypes.INTEGER,
    trang_thai_online: DataTypes.BOOLEAN,
    refresh_token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};