const { Router } = require('express')
const router = Router()

const {
  doGetAllPayments,
  doGetInsertPayment,
  doGetEditPayment,
  doGetDeletePayment,
  doPostInsertPayment,
  doPostEditPayment,
  payment

} = require('../controllers/payment.controller')

router.get('/', doGetAllPayments)
router.get('/insert', doGetInsertPayment)
router.post('/insert', doPostInsertPayment)
router.get('/edit/:id', doGetEditPayment)
router.post('/edit/:id', doPostEditPayment)
router.get('/delete/:id', doGetDeletePayment)
router.post('/payment', payment)

module.exports = router