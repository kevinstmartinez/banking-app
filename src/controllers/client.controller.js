const pool = require('../database')

const doGetAllClients = async(req, res) =>{
  const clients = await pool.query('SELECT * FROM clients')
  res.render('clients/listClients',{ clients })
}

const doGetInsertClient = (req, res) =>{
  res.send('clients/insert')
}

const doPostInsertClient = async (req, res) =>{
  const { dni, name_lastname, username, pass, id_bank } = req.body
  const newClient = { 
    dni,
    name_lastname,
    username,
    pass,
    id_bank
  }
  await pool.query('INSERT INTO clients set ?', [newClient])
  res.redirect('/clients')
}

const doGetEditClient = async(req, res) =>{
  const { id } = req.params
  const clients = await pool.query('SELECT * FROM clients WHERE id=?',[id])
  res.render('clients/edit', { clients:clients[0] })
}

const doPostEditClient = async(req, res)=>{
  const { id } = req.params
  const { name_lastname, username, pass } = req.body
  const newClient = {
    name_lastname,
    username,
    pass
  }
  await pool.query('UPDATE clients set ? WHERE id=?', [newClient, id])
  res.redirect('/clients')
}

const doGetDeleteClient = async(req, res)=>{
  const { id } = req.params
  await pool.query('DELETE FROM clients WHERE id=?', [id])
  res.redirect('/clients')
}

module.exports = {
  doGetAllClients,
  doGetInsertClient,
  doGetEditClient,
  doGetDeleteClient,
  doPostInsertClient,
  doPostEditClient
}