
const { Router } = require('express')
const router = Router()


const {
  getBanks,
  insertClient
} = require('../controllers/index.controllers')

router.get('/banks', getBanks)
router.get('/clients', insertClient)

module.exports = router