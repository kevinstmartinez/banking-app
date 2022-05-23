const pool = require('../database')
const jwt_decode = require('jwt-decode')


const transfer = async (req, res) => {
  const token = req.headers.authorization
  const decoded = jwt_decode(token.slice(7, -1))

  console.log(decoded)

  const account = await pool.query(
    'SELECT * FROM accounts WHERE id_client=?',
    [decoded.id]
  )

  const { amount, date_time = new Date(), destiny_account_number, origin_account_number = account } = req.body

  if (!amount || !destiny_account_number) {
    return res.status(400).json({
      message: 'Please provide the info'
    })
  }

  const accountTransferOrigin = await pool.query('SELECT * from accounts WHERE account_number=?', [origin_account_number])
  let transferWithdraw = accountTransferOrigin[0].balance - amount

  
  const accountTransferDestiny = await pool.query('SELECT * from accounts WHERE account_number=?', [destiny_account_number])
  let transferDeposit = accountTransferDestiny[0].balance + amount

  const clientOrigin = await pool.query('SELECT * FROM clients WHERE id=?', [accountTransferOrigin[0].id_client])
  const clientDestiny = await pool.query('SELECT * FROM clients WHERE id=?', [accountTransferDestiny[0].id_client])

  if (clientOrigin[0].id_bank !== clientDestiny[0].id_bank) {
    transferWithdraw -= 8470
  }
  
  
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
  transfer
}