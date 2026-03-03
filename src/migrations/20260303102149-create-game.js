'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      ma_van_dau: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      // FK → Users
      nguoi_choi_trang: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'nguoi_dung_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      // FK → Users
      nguoi_choi_den: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'nguoi_dung_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      // Lưu tên tại thời điểm chơi — tránh mất khi user đổi tên
      ten_nguoi_trang: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      ten_nguoi_den: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      // Lưu điểm tại thời điểm chơi
      diem_nguoi_trang: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      diem_nguoi_den: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      trang_thai: {
        type: Sequelize.ENUM('waiting', 'active', 'completed', 'abandoned'),
        allowNull: false,
        defaultValue: 'waiting',
      },

      ket_qua: {
        type: Sequelize.ENUM('white', 'black', 'draw'),
        allowNull: true,
      },

      ly_do_ket_thuc: {
        type: Sequelize.ENUM(
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

      // FEN string — trạng thái bàn cờ hiện tại
      ban_co_hien_tai: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      },

      danh_sach_nuoc_di: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
      },

      // PGN string — ký hiệu chuẩn của ván đấu
      ki_hieu_van_dau: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      // { type: 'rapid', initialTime: 600000, increment: 0 }
      cai_dat_thoi_gian: {
        type: Sequelize.JSON,
        allowNull: true,
      },

      // { white: +8, black: -8 }
      thay_doi_diem: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: { white: 0, black: 0 },
      },

      thoi_gian_bat_dau: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      thoi_gian_ket_thuc: {
        type: Sequelize.DATE,
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
    await queryInterface.addIndex('Games', ['ma_van_dau'])
    await queryInterface.addIndex('Games', ['nguoi_choi_trang'])
    await queryInterface.addIndex('Games', ['nguoi_choi_den'])
    await queryInterface.addIndex('Games', ['trang_thai'])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  }
};