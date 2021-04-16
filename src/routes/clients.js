const express = require('express')
const router = express.Router()
const pool = require('../database')

router.get('/insert', (req, res) =>{
  res.send('clients/insert')
})

router.post('/insert', async (req, res) =>{
  const { dni, name_lastname, username, pass, id_bank } = req.body
  const newClient = { 
    dni,
    name_lastname,
    username,
    pass,
    id_bank
  }
  const response = await pool.query('INSERT INTO clients set ?', [newClient])
})

router.get('/', async(req, res) =>{
  const clients = await pool.query('SELECT * FROM clients')
  res.render('',{ clients })
})

router.get('/edit/:id', async(req, res) =>{
  const { id } = req.params
  const clients = await pool.query('SELECT * FROM clients WHERE id=?',[id])
  res.render('', { clients:clients[0] })
})

router.post('/edit/:id', async(req, res)=>{
  const { id } = req.params
  const { name_lastname, username, pass } = req.body
  const newClient = {
    name_lastname,
    username,
    pass
  }
  await pool.query('UPDATE clients set ? WHERE id=?', [newClient, id])
  res.send('/clients')
})

router.get('/delete/:id', async(req, res)=>{
  const { id } = req.params
  await pool.query('DELETE FROM clients WHERE id=?', [id])
  res.redirect('/clients')
})