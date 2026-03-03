const winston = require('winston')

const logger = winston.createLogger({

  // Môi trường production chỉ hiện info trở lên
  // Môi trường development hiện tất cả kể cả debug
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',

  format: winston.format.combine(

    // Thêm timestamp vào mỗi dòng log
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),

    // Hiện stack trace khi log error object
    winston.format.errors({ stack: true }),

    // Format hiển thị cuối cùng
    winston.format.printf(({ timestamp, level, message, stack }) =>
      stack
        ? `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`
        : `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),

  transports: [

    // Luôn log ra console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // màu sắc trên terminal
        winston.format.printf(({ timestamp, level, message, stack }) =>
          stack
            ? `${timestamp} [${level}]: ${message}\n${stack}`
            : `${timestamp} [${level}]: ${message}`
        )
      ),
    }),

    // Production: ghi thêm ra file
    ...(process.env.NODE_ENV === 'production' ? [

      // Chỉ ghi error vào file này
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        maxsize: 10 * 1024 * 1024, // 10MB rồi tạo file mới
        maxFiles: 5,               // giữ tối đa 5 file cũ
      }),

      // Ghi tất cả log vào file này
      new winston.transports.File({
        filename: 'logs/combined.log',
        maxsize: 10 * 1024 * 1024,
        maxFiles: 5,
      }),

    ] : []),
  ],

  // Tắt hoàn toàn khi chạy test — không spam terminal Jest
  silent: process.env.NODE_ENV === 'test',
})

module.exports = logger