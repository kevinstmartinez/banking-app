const { Router } = require('express')
const router = Router()

const { 
  doGetAllClients,
  doGetInsertClient,
  doGetEditClient,
  doGetDeleteClient,
  doPostInsertClient,
  doPostEditClient } = require('../controllers/client.controller')

router.get('/', doGetAllClients)
router.get('/insert', doGetInsertClient)
router.post('/insert', doPostInsertClient)
router.get('/edit/:id', doGetEditClient)
router.post('/edit/:id', doPostEditClient)
router.get('/delete/:id', doGetDeleteClient)

module.exports = router