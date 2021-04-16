
const getBanks = async (req, res) => {
  const response = await pool.query('SELECT * FROM bank')
  res.status(200).json(response)
}

const insertClient = async (req, res) => { 
  const { dni, name_lastname, username, pass, id_bank } = req.body
  const newClient = { dni, name_lastname, username, pass, id_bank }
  const response = await pool.query('INSERT INTO clients set ?', [newClient])
  res.json({
    msg: 'Client created succesfully',
    body: {
      client: { dni, name_lastname, username, pass, id_bank }
    }
  })
  console.log(response)
}

const insertAccounts = async (req, res) =>{
  const { account_number, balance, type_account, id_client } = req.body
  const newAccount = { account_number, balance, type_account, id_client }
  const response = await pool.query('INSERT INRTO accounts set ?', [newAccount])
  res.json({
    msg: 'Account created succesfully',
    body: {
      account: { account_number, balance, type_account, id_client }
    }
  })
   console.log(response)

}

const insertServices = async (req, res) =>{
  const { name, NIT, type_service, id_account } = req.body
  const newService = { name, NIT, type_service, id_account }
  const response = await pool.query('INSERT INTO services set ?', [newService])
  res.json({
    msg: 'Service created successfully',
    body: {
      service: { name, NIT, type_service, id_account }
    }
  })
}

const insertPayments = async (req, res) =>{
  const { amount, date_time, number_payment_references, id_service } = req.body
  const newPayment = { amount, date_time, number_payment_references, id_service }
  const response = await pool.query('INSERT INTO payments set ?', [newPayment])
  res.json({
    msg: 'Payment created successfully',
    body: {
      payment: { amount, date_time, number_payment_references, id_service }
    }
  })
}

const insertTransfer = async (req, res) =>{
  const { amount, date_time, destiny_account_number, id_account } = req.body
  const newTransfer = { amount, date_time, destiny_account_number, id_account }
  const response = await pool.query('INSERT INTO transfer set ?', [newTransfer])
  res.json({
    msg: 'Transfer created successfully',
    body: {
      transfer: { amount, date_time, destiny_account_number, id_account }
    }
  })
}

module.exports = {getBanks, insertClient}