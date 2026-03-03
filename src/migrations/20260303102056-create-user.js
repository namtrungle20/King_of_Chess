'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      nguoi_dung_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      ten_dang_nhap: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },

      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      mat_khau: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      anh_dai_dien: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: 'default',
      },

      diem_xep_hang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1200,
      },

      thang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      thua: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      hoa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      trang_thai_online: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      refresh_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })

    // Index để query nhanh
    await queryInterface.addIndex('Users', ['email'])
    await queryInterface.addIndex('Users', ['ten_dang_nhap'])
    await queryInterface.addIndex('Users', ['diem_xep_hang'])
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};