'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // 1 user có thể chơi nhiều ván với tư cách trắng
      User.hasMany(models.Game, {
        foreignKey: 'nguoi_choi_trang',
        as: 'van_dau_trang',
      })

      // 1 user có thể chơi nhiều ván với tư cách đen
      User.hasMany(models.Game, {
        foreignKey: 'nguoi_choi_den',
        as: 'van_dau_den',
      })
    }
    KiemTraMK(matKhau) {
      return bcrypt.compare(matKhau, this.mat_khau)
    }
  }
  User.init({
    nguoi_dung_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ten_dang_nhap: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20],
        isAlphanumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mat_khau: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [6, 255],
      },
    },
    anh_dai_dien: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'default',
    },
    diem_xep_hang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1200,
      validate: {
        min: 0,
      },
    },
    thang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    thua: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    hoa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    trang_thai_online: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true,

    hooks: {
      // Hash mật khẩu trước khi tạo user
      beforeCreate: async (user) => {
        user.mat_khau = await bcrypt.hash(user.mat_khau, 12)
      },
      // Hash mật khẩu khi đổi mật khẩu
      beforeUpdate: async (user) => {
        if (user.changed('mat_khau')) {
          user.mat_khau = await bcrypt.hash(user.mat_khau, 12)
        }
      },
    },
  })

  return User
}
