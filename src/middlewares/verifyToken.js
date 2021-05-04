// const jwt = require('jsonwebtoken')
// const pool = require('../database')
// require('dotenv').config()

// const verifyToken = async (req, res, next) => {
//   let token = req.headers["x-access-token"]

//   if (!token) return res.status(403).json({message:"No token provided"})

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     req.clientId = decoded.id

//     const client = await pool.query('SELECT * FROM clients where id=?',[req.clientId])
//     if (!client) return res.status(404).send({ message: 'Not user found'}) 

//     next()
//   } catch(error){
//     return res.status(401).send({ message: 'Unauthorized'})
//   }
// }

// const isAdmin = async (req, res, next) => {
//   try {
//     const client = await pool.query('SELECT * FROM clients WHERE id=?',[req.clientId])
//   } catch (error) {
    
//   }
// }