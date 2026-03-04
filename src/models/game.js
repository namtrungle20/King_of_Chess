'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
   static associate(models) {
     Game.belongsTo(models.User, {
        foreignKey: 'nguoi_choi_trang',
        as: 'nguoi_trang',
      })

       Game.belongsTo(models.User, {
        foreignKey: 'nguoi_choi_den',
        as: 'nguoi_den',
      })
    }
  }

  Game.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ma_van_dau: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    nguoi_choi_trang: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    nguoi_choi_den: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ten_nguoi_trang: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ten_nguoi_den: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    diem_nguoi_trang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diem_nguoi_den: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trang_thai: {
      type: DataTypes.ENUM('waiting', 'active', 'completed', 'abandoned'),
      allowNull: false,
      defaultValue: 'waiting',
    },
    ket_qua: {
      type: DataTypes.ENUM('white', 'black', 'draw'),
      allowNull: true,
    },
    ly_do_ket_thuc: {
      type: DataTypes.ENUM(
        'checkmate',
        'resign',
        'timeout',
        'draw_agreement',
        'stalemate',
        'insufficient_material',
        'repetition',
        'fifty_moves',
        'abandoned'
      ),
      allowNull: true,
    },
    ban_co_hien_tai: {
      type: DataTypes.TEXT,
      allowNull: true,
      // FEN mặc định — bàn cờ ban đầu
      defaultValue: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    },
    danh_sach_nuoc_di: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    ki_hieu_van_dau: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cai_dat_thoi_gian: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    thay_doi_diem: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: { white: 0, black: 0 },
    },
    thoi_gian_bat_dau: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    thoi_gian_ket_thuc: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Game',
    tableName: 'Games',
    underscored: true,
  })

  return Game
}