const { response } = require('express')
const { Router } = require('express')
const router = Router()
const authController = require('../controllers/auth.controller')

router.post('/register', authController.register)

module.exports = router
