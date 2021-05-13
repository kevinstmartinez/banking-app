const { Router } = require('express')
const router = Router()
const { verifyToken, isAdmin } = require('../middlewares/index')

const {
  doGetAllPayments,
  doGetInsertPayment,
  doGetEditPayment,
  doGetDeletePayment,
  doPostInsertPayment,
  doPostEditPayment,
  payment
} = require('../controllers/payment.controller')

router.get('/', [verifyToken, isAdmin], doGetAllPayments)
router.get('/insert', [verifyToken, isAdmin], doGetInsertPayment)
router.post('/insert', [verifyToken, isAdmin], doPostInsertPayment)
router.get('/edit/:id', verifyToken, doGetEditPayment)
router.post('/edit/:id', verifyToken, doPostEditPayment)
router.get('/delete/:id', [verifyToken, isAdmin], doGetDeletePayment)
router.post('/payment', verifyToken, payment)

module.exports = router