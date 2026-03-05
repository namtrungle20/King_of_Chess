const jwt = require('jsonwebtoken')
const db = require('../models')

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Bạn cần đăng nhập để thực hiện hành động này!" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

        const user = await db.User.findOne({
            where: { nguoi_dung_id: decoded.id }
        });

        if (!user) return res.status(404).json({ message: "Người dùng không tồn tại!" });
        req.user = user;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token đã hết hạn, vui lòng làm mới!'
            })
        }
        return res.status(403).json({
            success: false,
            message: 'Token không hợp lệ!'
        })
    }
};
module.exports = { verifyToken };