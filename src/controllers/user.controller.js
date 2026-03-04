'use strict'

const db = require('../models')

// ═══════════════════════════════════════════════════════════
// [GET-ALL-USERS]  GET /api/users
// ═══════════════════════════════════════════════════════════

exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll({
            attributes: [
                'nguoi_dung_id',
                'ten_dang_nhap',
                'email',
                'anh_dai_dien',
                'diem_xep_hang',
                'thang',
                'thua',
                'hoa',
                'trang_thai_online',
                'created_at',
            ]
        })

        return res.status(200).json({
            success: true,
            total: users.length,
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy danh sách người dùng',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// ═══════════════════════════════════════════════════════════
// [GET-USER-BY-ID]  GET /api/users/:id
// ═══════════════════════════════════════════════════════════

exports.getUserById = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: { nguoi_dung_id: req.params.id },
            attributes: [
                'nguoi_dung_id',
                'ten_dang_nhap',
                'email',
                'anh_dai_dien',
                'diem_xep_hang',
                'thang',
                'thua',
                'hoa',
                'trang_thai_online',
                'created_at',
            ]
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng!'
            })
        }

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy thông tin người dùng',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// ═══════════════════════════════════════════════════════════
// [GET-USER-BY-USERNAME]  GET /api/users/username/:ten_dang_nhap
// ═══════════════════════════════════════════════════════════

exports.getUserByUsername = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: { ten_dang_nhap: req.params.ten_dang_nhap },
            attributes: [
                'nguoi_dung_id',
                'ten_dang_nhap',
                'email',
                'anh_dai_dien',
                'diem_xep_hang',
                'thang',
                'thua',
                'hoa',
                'trang_thai_online',
            ]
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng!'
            })
        }

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi server khi tìm người dùng',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// ═══════════════════════════════════════════════════════════
// [UPDATE-PROFILE]  PUT /api/users/:id  (protected)
// ═══════════════════════════════════════════════════════════

exports.updateProfile = async (req, res) => {
    try {
        const { email, anh_dai_dien } = req.body

        // Chỉ cho phép update chính mình
        if (req.user.nguoi_dung_id !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền chỉnh sửa tài khoản này!'
            })
        }

        await req.user.update({ email, anh_dai_dien })

        return res.status(200).json({
            success: true,
            message: 'Cập nhật thông tin thành công!',
            data: {
                id: req.user.nguoi_dung_id,
                ten_dang_nhap: req.user.ten_dang_nhap,
                email: req.user.email,
                anh_dai_dien: req.user.anh_dai_dien,
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi server khi cập nhật thông tin',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}