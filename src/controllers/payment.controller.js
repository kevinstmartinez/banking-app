const pool = require('../database')

const doGetAllPayments = async (req, res) => {
  const payments = await pool.query('SELECT * FROM payments')
  res.render('payments/listPayments', { payments })
}

const doGetInsertPayment = async (req, res) => {
  res.send('payments/insert')
}

const doPostInsertPayment = async (req, res) => {
  const { invoice_amount, date_time, number_payment_references, id_service } = req.body
  const newPayment = {
    invoice_amount,
    date_time,
    number_payment_references,
    id_service
  }
  await pool.query('INSERT INTO payments set ?', [newPayment])
  res.redirect('payments')
}

const doGetEditPayment = async (req, res) => {
  const { id } = req.params
  const payments = await pool.query('SELECT * FROM payments WHERE id=?', [id])
  res.render('payments/edit', { payments: payments[0] })
}

const doPostEditPayment = async (req, res) => {
  const { id } = req.params
  const { invoice_amount, date_time, number_payment_references, id_service } = req.body
  const newPayment = {
    invoice_amount,
    date_time,
    number_payment_references,
    id_service
  }
  await pool.query('UPDATE payments set ? WHERE id=?', [newPayment, id])
  res.redirect('/payments')
}

const doGetDeletePayment = async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM payments WHERE id=?', [id])
  res.redirect('/payments')
}

const payment = async (req, res) => {
  const { invoice_amount, number_payment_references, id_service } = req.body

  if (!invoice_amount || !number_payment_references || !id_service) {
    return res.status(400).send({
      message: 'Please provide the info'
    })
  }

  let isPay = false
  const date = new Date().toISOString().slice(0, 10)
  console.log(date)
  const service = await pool.query('SELECT * FROM services WHERE id=?', [id_service])
  const account = await pool.query('SELECT * FROM accounts WHERE id=?', [service[0].id_account])

  if (!(date < service[0].deadline.toJSON().slice(0, 10))) {
    return res.status(400).send({
      message: 'Date expired'
    })
  }
  if (!(invoice_amount === service[0].value)) {
    return res.status(400).send({
      message: 'The amount does not correspond to the value of the service'
    })
  }

  let pay
  if (account[0].balance >= invoice_amount) {
    pay = account[0].balance - invoice_amount
    isPay = true
    try {
      await pool.query('UPDATE accounts set balance=? WHERE id=?', [pay, account[0].id])

      await pool.query('INSERT INTO payments set ?', { invoice_amount, date_time: date, number_payment_references, status: isPay, id_service }, (error, results) => {
        if (error) {
          return res.status(400).send({
            message: 'Error'
          })
        } else {
        
          return res.status(200).send({
            message: 'Payment realized successfully'
          })
        }
      })

    } catch (error) {
      res.status(500).send({
        message: 'Internal Error. Please contact the administrator'
      })
    }
  } else {
    return res.status(400).send({
      message: 'Not enough balance'
    })
  }


}

module.exports = {
  doGetAllPayments,
  doGetInsertPayment,
  doGetEditPayment,
  doGetDeletePayment,
  doPostInsertPayment,
  doPostEditPayment,
  payment
}