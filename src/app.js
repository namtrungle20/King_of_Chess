'use strict'


const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const logger = require('./utils/logger')

const app = express()

// ─── Bảo mật ────────────────────────────────────────────
app.use(helmet())

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))

// ─── Rate Limiting ───────────────────────────────────────
// Auth — chặt, chống brute force
const authLimiter = rateLimit({
    windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS),
    max: parseInt(process.env.AUTH_RATE_LIMIT_MAX),
    message: {
        success: false,
        message: 'Quá nhiều lần đăng nhập, thử lại sau 15 phút.'
    },
    standardHeaders: true,
    legacyHeaders: false,
})

// API thông thường — thoải mái
const apiLimiter = rateLimit({
    windowMs: parseInt(process.env.API_RATE_LIMIT_WINDOW_MS),
    max: parseInt(process.env.API_RATE_LIMIT_MAX),
    message: {
        success: false,
        message: 'Quá nhiều request, thử lại sau.'
    },
    standardHeaders: true,
    legacyHeaders: false,
})

// History — vừa phải
const historyLimiter = rateLimit({
    windowMs: parseInt(process.env.HISTORY_RATE_LIMIT_WINDOW_MS),
    max: parseInt(process.env.HISTORY_RATE_LIMIT_MAX),
    message: {
        success: false,
        message: 'Vui lòng chờ một chút trước khi tải thêm.'
    },
    standardHeaders: true,
    legacyHeaders: false,
})

// ─── Body Parsing ────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// ─── Logging ─────────────────────────────────────────────
app.use(morgan('combined', {
    stream: { write: (msg) => logger.http(msg.trim()) },
    skip: () => process.env.NODE_ENV === 'test',
}))

// ─── Health Check ─────────────────────────────────────────
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'King of Chess API đang chạy',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
    })
})

// ─── Routes ──────────────────────────────────────────────
app.use('/api/auth', authLimiter, require('./routes/auth.routes'))
app.use('/api/users', apiLimiter, require('./routes/user.routes'))
app.use('/api/games/history', historyLimiter, require('./routes/game.routes'))
app.use('/api/games', apiLimiter, require('./routes/game.routes'))
app.use('/api/leaderboard', apiLimiter, require('./routes/leaderboard.routes'))

// ─── 404 ─────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} không tìm thấy`
    })
})

// ─── Global Error Handler ─────────────────────────────────
app.use((err, req, res, next) => {
    logger.error(err.stack)
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Lỗi server',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    })
})

module.exports = app