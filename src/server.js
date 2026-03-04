'use strict'

if (!process.env.DB_HOST) {
  require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
  })
}

const http = require('http')
const app = require('./app')
const { connectDB } = require('./config/database')
const { initSocket } = require('./socket')
const logger = require('./utils/logger')

const PORT = process.env.PORT || 3001

const start = async () => {
    // 1. Kết nối DB trước
    await connectDB()

    // 2. Tạo HTTP server từ Express app
    const server = http.createServer(app)

    // 3. Gắn Socket.io vào server
    initSocket(server)

    // 4. Lắng nghe port
    server.listen(PORT, () => {
        logger.info(`🚀 Server đang chạy tại port ${PORT}`)
        logger.info(`📡 Môi trường: ${process.env.NODE_ENV}`)
        logger.info(`🔌 Socket.io sẵn sàng`)
    })

    // 5. Xử lý tắt server an toàn
    process.on('SIGTERM', () => {
        logger.info('Đang tắt server...')
        server.close(() => {
            logger.info('Server đã tắt')
            process.exit(0)
        })
    })

    // 6. Bắt lỗi không xử lý được
    process.on('unhandledRejection', (err) => {
        logger.error('Lỗi không xử lý được:', err)
        server.close(() => process.exit(1))
    })
}

start()