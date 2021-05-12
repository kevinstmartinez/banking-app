const pool = require('../database')

const doGetAllTransfers = async (req, res) => {
  const transfers = await pool.query('SELECT * FROM transfer')
  res.render('transfers/listTransfers', { transfers })
}

const doGetInsertTransfer = async (req, res) => {
  res.json('transfers/insert')
}

const doPostInsertTransfer = async (req, res) => {
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

const doGetEditTransfer = async (req, res) => {
  const { id } = req.params
  const transfers = await pool.query('SELECT * FROM transfer WHERE id=?', [id])
  res.render('transfers/edit', { transfers: transfers[0] })
}

const doPostEditTransfer = async (req, res) => {
  const { id } = req.params
  const { amount, date_time, destiny_account_number, origin_account_number, id_account } = req.body
  const newTransfer = {
    amount,
    date_time,
    destiny_account_number,
    origin_account_number,
    id_account
  }
  await pool.query('UPDATE transfer set ? WHERE id=?', [newTransfer, id])
  res.redirect('/transfers')
}

const doGetDeleteTransfer = async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM transfers WHERE id=?', [id])
  res.redirect('/transfer')
}

const transfer = async (req, res) => {
  const { amount, date_time = new Date(), destiny_account_number, origin_account_number } = req.body

  if (!amount || !destiny_account_number || !origin_account_number) {
    return res.status(400).json({
      message: 'Please provide the info'
    })
  }

  const accountTransferOrigin = await pool.query('SELECT * from accounts WHERE account_number=?', [origin_account_number])
  let transferWithdraw = accountTransferOrigin[0].balance - amount

  
  const accountTransferDestiny = await pool.query('SELECT * from accounts WHERE account_number=?', [destiny_account_number])
  let transferDeposit = accountTransferDestiny[0].balance + amount
  
  if (accountTransferOrigin[0].balance >= amount) transferWithdraw
  else return res.status(400).json({ message: 'Not enough balance' })
  
  try {
    await pool.query('UPDATE accounts SET balance=? WHERE id=?', [transferWithdraw, accountTransferOrigin[0].id])
    await pool.query('UPDATE accounts SET balance=? WHERE id=?', [transferDeposit, accountTransferDestiny[0].id])

    const id_account = accountTransferOrigin[0].id

    await pool.query('INSERT INTO transfer set ?', { amount, date_time, destiny_account_number, origin_account_number, id_account })

    return res.status(200).json({ message: 'Transfer realized successfully' })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Error. Please contact the administrator'
    })
  }
}

module.exports = {
  doGetAllTransfers,
  doGetInsertTransfer,
  doGetEditTransfer,
  doGetDeleteTransfer,
  doPostInsertTransfer,
  doPostEditTransfer,
  transfer
}