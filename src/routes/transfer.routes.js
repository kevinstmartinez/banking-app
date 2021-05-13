const { Router } = require('express')
const router = Router()
const { verifyToken, isAdmin } = require('../middlewares/index')

const {
  doGetAllTransfers,
  doGetInsertTransfer,
  doGetEditTransfer,
  doGetDeleteTransfer,
  doPostInsertTransfer,
  doPostEditTransfer,
  transfer

} = require('../controllers/transfer.controller')

router.get('/', [verifyToken, isAdmin], doGetAllTransfers)
router.get('/insert', [verifyToken, isAdmin], doGetInsertTransfer)
router.post('/insert', [verifyToken, isAdmin], doPostInsertTransfer)
router.get('/edit/:id', [verifyToken, isAdmin], doGetEditTransfer)
router.post('/edit/:id', [verifyToken, isAdmin], doPostEditTransfer)
router.get('/delete/:id', [verifyToken, isAdmin], doGetDeleteTransfer)
router.post('/transfer', verifyToken, transfer)

module.exports = router