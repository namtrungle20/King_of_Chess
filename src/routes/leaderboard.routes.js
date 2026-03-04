'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Leaderboard routes' })
})

module.exports = router