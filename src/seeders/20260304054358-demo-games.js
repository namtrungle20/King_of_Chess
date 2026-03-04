'use strict'

// Dùng lại UUID từ seeder users
const USER_IDS = {
  magnus:  'aaaa-0001-0001-0001-000000000001',
  hikaru:  'aaaa-0002-0002-0002-000000000002',
  fabiano: 'aaaa-0003-0003-0003-000000000003',
  player1: 'aaaa-0004-0004-0004-000000000004',
  player2: 'aaaa-0005-0005-0005-000000000005',
}

module.exports = {
  async up(queryInterface) {
    const now = new Date()

    await queryInterface.bulkInsert('Games', [
      {
        id:                'bbbb-0001-0001-0001-000000000001',
        ma_van_dau:        'game-demo-001',
        nguoi_choi_trang:  USER_IDS.magnus,
        nguoi_choi_den:    USER_IDS.hikaru,
        ten_nguoi_trang:   'magnus',
        ten_nguoi_den:     'hikaru',
        diem_nguoi_trang:  2850,
        diem_nguoi_den:    2750,
        trang_thai:        'completed',
        ket_qua:           'white',
        ly_do_ket_thuc:    'checkmate',
        ban_co_hien_tai:   'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        danh_sach_nuoc_di: JSON.stringify([]),
        ki_hieu_van_dau:   '1. e4 e5 2. Nf3 Nc6 3. Bb5',
        cai_dat_thoi_gian: JSON.stringify({ type: 'rapid', initialTime: 600000, increment: 0 }),
        thay_doi_diem:     JSON.stringify({ white: 8, black: -8 }),
        thoi_gian_bat_dau: now,
        thoi_gian_ket_thuc: now,
        created_at:        now,
        updated_at:        now,
      },
      {
        id:                'bbbb-0002-0002-0002-000000000002',
        ma_van_dau:        'game-demo-002',
        nguoi_choi_trang:  USER_IDS.fabiano,
        nguoi_choi_den:    USER_IDS.magnus,
        ten_nguoi_trang:   'fabiano',
        ten_nguoi_den:     'magnus',
        diem_nguoi_trang:  2700,
        diem_nguoi_den:    2850,
        trang_thai:        'completed',
        ket_qua:           'draw',
        ly_do_ket_thuc:    'draw_agreement',
        ban_co_hien_tai:   'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        danh_sach_nuoc_di: JSON.stringify([]),
        ki_hieu_van_dau:   '1. d4 d5 2. c4 e6',
        cai_dat_thoi_gian: JSON.stringify({ type: 'classical', initialTime: 9000000, increment: 30000 }),
        thay_doi_diem:     JSON.stringify({ white: 3, black: -3 }),
        thoi_gian_bat_dau: now,
        thoi_gian_ket_thuc: now,
        created_at:        now,
        updated_at:        now,
      },
      {
        id:                'bbbb-0003-0003-0003-000000000003',
        ma_van_dau:        'game-demo-003',
        nguoi_choi_trang:  USER_IDS.player1,
        nguoi_choi_den:    USER_IDS.player2,
        ten_nguoi_trang:   'player1',
        ten_nguoi_den:     'player2',
        diem_nguoi_trang:  1200,
        diem_nguoi_den:    1150,
        trang_thai:        'completed',
        ket_qua:           'black',
        ly_do_ket_thuc:    'resign',
        ban_co_hien_tai:   'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        danh_sach_nuoc_di: JSON.stringify([]),
        ki_hieu_van_dau:   '1. e4 c5 2. Nf3 d6',
        cai_dat_thoi_gian: JSON.stringify({ type: 'blitz', initialTime: 300000, increment: 0 }),
        thay_doi_diem:     JSON.stringify({ white: -16, black: 16 }),
        thoi_gian_bat_dau: now,
        thoi_gian_ket_thuc: now,
        created_at:        now,
        updated_at:        now,
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Games', null, {})
  },
}