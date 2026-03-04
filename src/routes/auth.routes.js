'use strict'

const express = require('express')
const authController = require('../controllers/auth.controller')
const { verifyToken } = require('../middleware/auth.middleware')
const router = express.Router()


router.post('/login', authController.login)
router.post('/refresh-token', authController.refreshToken)
router.post('/register', authController.register)

router.post('/logout', verifyToken, authController.logout)
router.get('/me', verifyToken, authController.getMe)

module.exports = router