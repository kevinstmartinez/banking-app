const pool = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const register = (req, res) =>{
  const { dni, email, name_lastname, username, pass, passConfirm, id_bank } = req.body
  pool.query('SELECT * FROM clients WHERE email=?', [email], async (error, results) =>{
    if (error) {
      console.log(error)
    }
    if (results.length > 0) {
      return res.status(400).send({
        message: 'That email is already in use'

      })
  
    } else if (pass !== passConfirm) {
      return res.status(400).res.send( {
        message: 'Passwords do no match'
      })
    }

    let hashedPassword = await bcrypt.hash(pass, 8)

    pool.query('INSERT INTO clients set ?', { dni: dni, email: email, name_lastname: name_lastname, username: username, pass: hashedPassword, id_bank: id_bank}, (error, results) =>{
      if (error) {
        console.log(error)
      } else {
        console.log(results)
        return res.status(200).send({ message:'Client registered'})
      }
    })

  })  
}

module.exports = {
   register
}