const pool = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const register = (req, res) =>{
  const { dni, email, name_lastname, username, pass, passConfirm, id_bank, role } = req.body
  let roles = req.body.role
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

   

    if (roles) {
      const foundRole = await pool.query('SELECT * FROM roles WHERE role=?', [roles])
      roles = foundRole.map( role => role.id)
      console.log(roles)
    } else {
      const role = await pool.query('SELECT * FROM roles WHERE role=?',['user']);
      roles = role[0].id
 
    }

    let hashedPassword = await bcrypt.hash(pass, 8)

    pool.query('INSERT INTO clients set ?', { dni: dni, email: email, name_lastname: name_lastname, username: username, pass: hashedPassword, id_bank: id_bank, id_role: roles}, (error, results) =>{
      if (error) {
        console.log(error)
      } else {
        console.log(results)
        return res.status(200).send({ message:'Client registered'})

      }
    }) 

  })  
}

const login = async (req, res)=>{
  try {

    const { username, pass } = req.body
    if (!username || !pass) {
      return res.status(400).send({
        message: 'Please provide an email and password'
      })
    }

    await pool.query('SELECT * FROM clients WHERE username=?', [username], async(error, results) =>{
      console.log(results)
      if (!results || !(await bcrypt.compare(pass, results[0].pass))) {
        res.status(401).send({
          message: 'Username or Password is incorrect'
        })
      } else {
        const id = results[0].id

        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        })

        const cookieOptions = {
          expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000 ),
          httpOnly: true
        }
        res.cookie('jwt', token, cookieOptions)
        res.status(200).json({
          token
        })
      }
    })
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
   register,
   login
}