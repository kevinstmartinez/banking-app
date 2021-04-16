const { Router } = require('express')
const router = Router()

const {
  doGetAllAccounts,
  doGetInsertAccount,
  doGetEditAccount,
  doGetDeleteAccount,
  doPostInsertAccount,
  doPostEditAccount
} = require('../controllers/account.controller')

router.get('/', doGetAllAccounts)
router.get('/insert', doGetInsertAccount)
router.post('/insert', doPostInsertAccount)
router.get('/edit/:id', doGetEditAccount)
router.post('/edit/:id', doPostEditAccount)
router.get('/delete/:id', doGetDeleteAccount)

module.exports = router