const pool = require('../database')

const doGetAllTransfers = async(req, res) =>{
  const transfers = await pool.query('SELECT * FROM transfer')
  res.render('transfers/listTransfers',{ transfers })
}

const doGetInsertTransfer = async(req, res) =>{
  res.send('transfers/insert')
}

const doPostInsertTransfer = async(req, res) =>{
  const { amount, date_time, destiny_account_number, id_account } = req.body
  const newTransfer = {
    amount,
    date_time,
    destiny_account_number,
    id_account
  }
  await pool.query('INSERT INTO transfer set ?', [newTransfer])
  res.redirect('/transfers')
  
}

const doGetEditTransfer = async(req, res) =>{
  const { id } = req.params
  const transfers = await pool.query('SELECT * FROM transfer WHERE id=?',[id])
  res.render('transfers/edit', { transfers:transfers[0] })
}

const doPostEditTransfer = async(req, res) =>{
  const { id } = req.params
  const { amount, date_time, destiny_account_number, id_account } = req.body
  const newTransfer = {
    amount,
    date_time,
    destiny_account_number,
    id_account
  }
  await pool.query('UPDATE transfer set ? WHERE id=?', [newTransfer, id])
  res.redirect('/transfers')

}

const doGetDeleteTransfer = async(req, res) =>{
  const { id } = req.params
  await pool.query('DELETE FROM transfers WHERE id=?', [id])
  res.redirect('/transfer')
}

module.exports = {
  doGetAllTransfers,
  doGetInsertTransfer,
  doGetEditTransfer,
  doGetDeleteTransfer,
  doPostInsertTransfer,
  doPostEditTransfer
}