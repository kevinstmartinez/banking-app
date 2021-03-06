const express = require('express')
const morgan = require('morgan')
const app = express()
const cookieParser = require('cookie-parser')

const { NODE_ENV } = process.env
const port = NODE_ENV === 'test' ? 4001 : 4000

require('./database')

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.listen(port, ()=>{
  console.log(`listen on port ${port}`)
})
app.use(require('./routes/index.routes'))
app.use('/api/accounts', require('./routes/account.routes'))
app.use(require('./routes/client.routes'))
app.use('/api/payments', require('./routes/payment.routes'))
app.use('/api/services', require('./routes/service.routes'))
app.use('/api/transfers', require('./routes/transfer.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
