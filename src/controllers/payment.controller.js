const pool = require('../database')

const doGetAllPayments = async(req, res) =>{
  const payments = await pool.query('SELECT * FROM payments')
  res.render('payments/listPayments',{ payments })
}

const doGetInsertPayment = async(req, res) =>{
  res.send('payments/insert')
}

const doPostInsertPayment = async(req, res) =>{
  const { amount, date_time, number_payment_references, id_service } = req.body
  const newPayment = { 
    amount,
    date_time,
    number_payment_references,
    id_service
  }
  await pool.query('INSERT INTO payments set ?', [newPayment])
  res.redirect('payments')
}

const doGetEditPayment = async(req, res) =>{
  const { id } = req.params
  const payments = await pool.query('SELECT * FROM payments WHERE id=?',[id])
  res.render('payments/edit', { payments:payments[0] })
}

const doPostEditPayment = async(req, res) =>{
  const { id } = req.params
  const { amount, date_time, number_payment_references, id_service } = req.body
  const newPayment = { 
    amount,
    date_time,
    number_payment_references,
    id_service
  }
  await pool.query('UPDATE payments set ? WHERE id=?', [newPayment, id])
  res.redirect('/payments')
}

const doGetDeletePayment = async(req, res) =>{
  const { id } = req.params
  await pool.query('DELETE FROM payments WHERE id=?', [id])
  res.redirect('/payments')
}

module.exports = {
  doGetAllPayments,
  doGetInsertPayment,
  doGetEditPayment,
  doGetDeletePayment,
  doPostInsertPayment,
  doPostEditPayment
}