const { Router } = require('express')
const router = Router()

const {
  doGetAllServices,
  doGetInsertService,
  doGetEditService,
  doGetDeleteService,
  doPostInsertService,
  doPostEditService,
  deadline

} = require('../controllers/service.controller')

router.get('/', doGetAllServices)
router.get('/insert', doGetInsertService)
router.post('/insert', doPostInsertService)
router.get('/edit/:id', doGetEditService)
router.post('/edit/:id', doPostEditService)
router.get('/delete/:id', doGetDeleteService)
router.get('/deadline/:id', deadline)

module.exports = router