const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
  res.send('index')
})

router.get('/register', (req, res) =>{
  res.send('Register')
})

router.get('/login', (req, res) =>{
  
})

module.exports = router