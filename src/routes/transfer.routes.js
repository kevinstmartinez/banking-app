const { Router } = require('express')
const router = Router()

const {
  doGetAllTransfers,
  doGetInsertTransfer,
  doGetEditTransfer,
  doGetDeleteTransfer,
  doPostInsertTransfer,
  doPostEditTransfer

} = require('../controllers/transfer.controller')

router.get('/', doGetAllTransfers)
router.get('/insert', doGetInsertTransfer)
router.post('/insert', doPostInsertTransfer)
router.get('/edit/:id', doGetEditTransfer)
router.post('/edit/:id', doPostEditTransfer)
router.get('/delete/:id', doGetDeleteTransfer)

module.exports = router