'use strict'

const express = require('express')
const router = express.Router()

router.get('/user', (req, res) => {
  res.json({ success: true, message: 'User routes' })
})

module.exports = router