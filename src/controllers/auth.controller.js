const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

const AccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN });
};

const RefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN });
};

exports.register = async (req, res) => {
    try {
        const { ten_dang_nhap, mat_khau, email } = req.body

        // Kiểm tra tên đăng nhập đã tồn tại chưa
        const existingUser = await db.User.findOne({ where: { ten_dang_nhap } })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Tên đăng nhập đã được sử dụng!'
            })
        }


        const user = await db.User.create({
            ten_dang_nhap,
            email,
            mat_khau,
        })

        return res.status(201).json({
            success: true,
            message: 'Đăng ký thành công!',
            data: {
                id: user.nguoi_dung_id,
                ten_dang_nhap: user.ten_dang_nhap,
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi server khi đăng ký',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { ten_dang_nhap, mat_khau } = req.body;

        const user = await db.User.findOne({ where: { ten_dang_nhap } });
        if (!user) {
            return res.status(401).json({ message: "Tên đăng nhập không tồn tại!" });
        }

        const isPasswordValid = await bcrypt.compare(mat_khau, user.mat_khau);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mật khẩu không đúng" });
        }

        const accessToken = AccessToken(user.nguoi_dung_id);
        const refreshToken = RefreshToken(user.nguoi_dung_id);


        res.json({
            accessToken,
            refreshToken,
            user: { id: user.nguoi_dung_id, ten: user.ten_dang_nhap }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "Không tìm thấy Refresh Token" });

    try {
        // 1. Kiểm tra tính hợp lệ của token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);

        // 2. Kiểm tra token có khớp với token trong Database không
        const user = await db.User.findOne({
            where: {
                nguoi_dung_id: decoded.id,
                refresh_token: refreshToken
            }
        });

        if (!user) return res.status(403).json({ message: "Refresh Token không hợp lệ hoặc đã bị dùng" });

        // 3. Tạo Access Token mới
        const newAccessToken = AccessToken(user.nguoi_dung_id);

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ message: "Token đã hết hạn, vui lòng đăng nhập lại" });
    }
};



exports.logout = async (req, res) => {
    // Xóa refresh token trong DB khi người dùng log out
    const user = await db.User.findByPk(req.user.nguoi_dung_id);
    if (user) {
        await user.update({ refresh_token: null });
    }
    res.json({ message: "Đã đăng xuất thành công" });
};

exports.getMe = async (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            id: req.user.nguoi_dung_id,
            ten_dang_nhap: req.user.ten_dang_nhap,
            email: req.user.email,
        }
    })
}
