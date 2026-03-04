'use strict'
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

// Tạo sẵn UUID để dùng lại trong seeder games
const USER_IDS = {
  magnus:  'aaaa-0001-0001-0001-000000000001',
  hikaru:  'aaaa-0002-0002-0002-000000000002',
  fabiano: 'aaaa-0003-0003-0003-000000000003',
  player1: 'aaaa-0004-0004-0004-000000000004',
  player2: 'aaaa-0005-0005-0005-000000000005',
}

module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash('password123', 12)
    const now = new Date()

    await queryInterface.bulkInsert('Users', [
      {
        nguoi_dung_id:    USER_IDS.magnus,
        ten_dang_nhap:    'magnus',
        email:            'magnus@chess.com',
        mat_khau:         hash,
        anh_dai_dien:     'default',
        diem_xep_hang:    2850,
        thang:            150,
        thua:             20,
        hoa:              30,
        trang_thai_online: false,
        refresh_token:    null,
        created_at:       now,
        updated_at:       now,
      },
      {
        nguoi_dung_id:    USER_IDS.hikaru,
        ten_dang_nhap:    'hikaru',
        email:            'hikaru@chess.com',
        mat_khau:         hash,
        anh_dai_dien:     'default',
        diem_xep_hang:    2750,
        thang:            130,
        thua:             30,
        hoa:              25,
        trang_thai_online: false,
        refresh_token:    null,
        created_at:       now,
        updated_at:       now,
      },
      {
        nguoi_dung_id:    USER_IDS.fabiano,
        ten_dang_nhap:    'fabiano',
        email:            'fabiano@chess.com',
        mat_khau:         hash,
        anh_dai_dien:     'default',
        diem_xep_hang:    2700,
        thang:            120,
        thua:             35,
        hoa:              28,
        trang_thai_online: false,
        refresh_token:    null,
        created_at:       now,
        updated_at:       now,
      },
      {
        nguoi_dung_id:    USER_IDS.player1,
        ten_dang_nhap:    'player1',
        email:            'player1@chess.com',
        mat_khau:         hash,
        anh_dai_dien:     'default',
        diem_xep_hang:    1200,
        thang:            10,
        thua:             12,
        hoa:              3,
        trang_thai_online: false,
        refresh_token:    null,
        created_at:       now,
        updated_at:       now,
      },
      {
        nguoi_dung_id:    USER_IDS.player2,
        ten_dang_nhap:    'player2',
        email:            'player2@chess.com',
        mat_khau:         hash,
        anh_dai_dien:     'default',
        diem_xep_hang:    1150,
        thang:            8,
        thua:             14,
        hoa:              2,
        trang_thai_online: false,
        refresh_token:    null,
        created_at:       now,
        updated_at:       now,
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {})
  },
}