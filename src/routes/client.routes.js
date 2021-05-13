const { Router } = require('express')
const router = Router()
const { verifyToken, isAdmin } = require('../middlewares/index')

const { 
  doGetAllClients,
  doGetInsertClient,
  doGetEditClient,
  doGetDeleteClient,
  doPostInsertClient,
  doPostEditClient } = require('../controllers/client.controller')

router.get('/', [verifyToken, isAdmin], doGetAllClients)
router.get('/insert', [verifyToken, isAdmin], doGetInsertClient)
router.post('/insert', [verifyToken, isAdmin], doPostInsertClient)
router.get('/edit/:id', [verifyToken, isAdmin], doGetEditClient)
router.post('/edit/:id', [verifyToken, isAdmin], doPostEditClient)
router.get('/delete/:id', [verifyToken, isAdmin], doGetDeleteClient)

module.exports = router