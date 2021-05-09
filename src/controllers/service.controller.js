const pool = require('../database')

const doGetAllServices = async(req, res) =>{
  const services = await pool.query('SELECT * FROM services')
  res.render('services/listServices',{ services })
}

const doGetInsertService = async(req, res) =>{
  res.send('services/insert')
}

const generateNumberService = () =>{
  let num = ''
  while (num.length < 11) {
      num += Math.floor(Math.random() * 10)
  }
  return num
}
const doPostInsertService = async(req, res) =>{
  const { name, type_service, value, id_account } = req.body
  const date = new Date()
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

  const service = { 
    name,
    NIT: generateNumberService(),
    deadline: lastDay,
    type_service,
    value,
    number_references: generateNumberService(),
    status: false,
    id_account
  }
  const response = await pool.query('INSERT INTO services set ?', [service])
  res.status(200).json({ message:'Service inserted successfully' })
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

const deadline = async(req, res) =>{
  const { id } = req.params
  const services = await pool.query('SELECT * FROM services WHERE id=? ', [id])

  


  res.status(200).json({ 
    message: 'ok'
  })
}

module.exports = {
  doGetAllServices,
  doGetInsertService,
  doGetEditService,
  doGetDeleteService,
  doPostInsertService,
  doPostEditService,
  deadline
}