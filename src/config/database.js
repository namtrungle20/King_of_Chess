const { Sequelize } = require('sequelize')
const logger = require('../utils/logger')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',

    // Dùng logger thay console.log của Sequelize
    logging: (msg) => logger.debug(msg),

    // Pool kết nối — tránh tạo kết nối mới mỗi request
    pool: {
      max: 10,      // tối đa 10 kết nối cùng lúc
      min: 0,       // tối thiểu 0 khi không có request
      acquire: 30000, // chờ tối đa 30s để lấy kết nối
      idle: 10000,    // đóng kết nối nếu idle quá 10s
    },

    // Tắt log trong môi trường test
    ...(process.env.NODE_ENV === 'test' && { logging: false }),
  }
)

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    logger.info('✅ MySQL connected')
    logger.info(`📦 DB Host: ${process.env.DB_HOST}`)
   
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true })
      logger.info('✅ Models synced')
    }


  } catch (error) {
    logger.error(`❌ MySQL connection failed: ${error.message}`)
    logger.error(`Host: ${process.env.DB_HOST}`)
    logger.error(`Port: ${process.env.DB_PORT}`)
    logger.error(`User: ${process.env.DB_USER}`)
    logger.error(`DB: ${process.env.DB_NAME}`)
    process.exit(1)
  }
}

module.exports = { sequelize, connectDB }
