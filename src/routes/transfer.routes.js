const { Router } = require('express')
const router = Router()
const { verifyToken, isAdmin } = require('../middlewares/index')

const {

  transfer

} = require('../controllers/transfer.controller')


router.post('/transfer', verifyToken, transfer)

module.exports = router