require('dotenv').config()
const mysql = require('mysql')
const { promisify } = require('util')

const {DB_DATABASE, DB_DATABASE_TEST, NODE_ENV} = process.env

let host = process.env.DB_HOST
let user = process.env.DB_USER
let password = process.env.DB_PASSWORD
let database_name = NODE_ENV === 'test' ? DB_DATABASE_TEST : DB_DATABASE

const database = {
  host: host,
  user: user,
  password: password,
  database: database_name
}
const pool = mysql.createPool(database)

pool.getConnection((err, conn)=>{
  if(err){
    if(err.code === 'PROTOCOL_CONNECTION_LOST') console.error('database connection lost')
    if(err.code === 'ER_CON_COUNT_ERROR') console.error('database has to many connection')
    if(err.code === 'ECONNREFUSED') console.error('database connection was refused')
  }
  if(conn) conn.release()
  console.log('DB is connected')
  return
})
pool.query = promisify(pool.query)
module.exports = pool