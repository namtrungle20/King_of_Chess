'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game.init({
    ma_van_dau: DataTypes.STRING,
    nguoi_choi_trang: DataTypes.UUID,
    nguoi_choi_den: DataTypes.UUID,
    ten_nguoi_trang: DataTypes.STRING,
    ten_nguoi_den: DataTypes.STRING,
    diem_nguoi_trang: DataTypes.INTEGER,
    diem_nguoi_den: DataTypes.INTEGER,
    trang_thai: DataTypes.STRING,
    ket_qua: DataTypes.STRING,
    ly_do_ket_thuc: DataTypes.STRING,
    ban_co_hien_tai: DataTypes.TEXT,
    danh_sach_nuoc_di: DataTypes.JSON,
    ki_hieu_van_dau: DataTypes.TEXT,
    cai_dat_thoi_gian: DataTypes.JSON,
    thay_doi_diem: DataTypes.JSON,
    thoi_gian_bat_dau: DataTypes.DATE,
    thoi_gian_ket_thuc: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};