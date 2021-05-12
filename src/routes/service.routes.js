const { Router } = require('express')
const router = Router()
const { verifyToken, isAdmin } = require('../middlewares/index')

const {
  doGetAllServices,
  doGetInsertService,
  doGetEditService,
  doGetDeleteService,
  doPostInsertService,
  doPostEditService,
} = require('../controllers/service.controller')

router.get('/', [verifyToken, isAdmin], doGetAllServices)
router.get('/insert', [verifyToken, isAdmin], doGetInsertService)
router.post('/insert', [verifyToken, isAdmin], doPostInsertService)
router.get('/edit/:id', [verifyToken, isAdmin], doGetEditService)
router.post('/edit/:id', [verifyToken, isAdmin], doPostEditService)
router.get('/delete/:id', [verifyToken, isAdmin], doGetDeleteService)


module.exports = router