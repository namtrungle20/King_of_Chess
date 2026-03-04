'use strict'

const { Server } = require('socket.io')
const logger = require('../utils/logger')

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    logger.info(`🔌 Socket kết nối: ${socket.id}`)

    socket.on('disconnect', () => {
      logger.info(`🔌 Socket ngắt kết nối: ${socket.id}`)
    })
  })

  logger.info('Socket.io đã khởi động')
  return io
}

module.exports = { initSocket }