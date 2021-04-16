const pool = require('../database')

const doGetAllServices = async(req, res) =>{
  const services = await pool.query('SELECT * FROM services')
  res.render('services/listServices',{ services })
}

const doGetInsertService = async(req, res) =>{
  res.send('services/insert')
}

const doPostInsertService = async(req, res) =>{
  const { name, NIT, type_service, id_account } = req.body
  const newService = { 
    name,
    NIT,
    type_service,
    id_account
  }
  const response = await pool.query('INSERT INTO services set ?', [newService])
  res.redirect('/services')
}

const doGetEditService = async(req, res) =>{
  const { id } = req.params
  const services = await pool.query('SELECT * FROM services WHERE id=?',[id])
  res.render('services/edit', { services: services[0] })
}

const doPostEditService = async(req, res) =>{
  const { id } = req.params
  const { name, NIT, type_service, id_account } = req.body
  const newService = { 
    name,
    NIT,
    type_service,
    id_account
  }
  await pool.query('UPDATE services set ? WHERE id=?', [newService, id])
  res.redirect('/services')
}

const doGetDeleteService = async(req, res) =>{
  const { id } = req.params
  await pool.query('DELETE FROM services WHERE id=?', [id])
  res.redirect('/services')
}

module.exports = {
  doGetAllServices,
  doGetInsertService,
  doGetEditService,
  doGetDeleteService,
  doPostInsertService,
  doPostEditService
}