require('dotenv').config()
const jwt = require('jsonwebtoken')
const pool = require('../database')

const verifyToken = async (req, res, next) => {
  let auth = req.headers.authorization

  if (!auth) return res.status(403).json({ message:'No token provided' })

  let token = null
  if (auth && auth.toLowerCase().startsWith('bearer')) token = auth.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.clientId = decoded.id
    const client = await pool.query('SELECT * FROM clients WHERE id=?', [req.clientId])
    if (!client) return res.status(404).json(({ message: 'Not user found' }))
    
    next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

const isAdmin = async (req, res, next) =>{
  try {
    const client = await pool.query('SELECT * FROM clients WHERE id=?', [req.clientId])
    const roles = await pool.query('SELECT * FROM roles WHERE id=?', [client[0].id_role])

    console.log(roles)
    roles.filter(index => index.role === 'admin' ? next() : res.status(403).json({ message: 'Require Admin role'}))

  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
}

module.exports = {
  verifyToken,
  isAdmin
}