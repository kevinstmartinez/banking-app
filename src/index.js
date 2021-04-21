const express = require('express')
const morgan = require('morgan')
const app = express()
const cookieParser = require('cookie-parser')

const port = 4000 || process.env.PORT

require('./database')

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.listen(port, ()=>{
  console.log(`listen on port ${port}`)
})
app.use(require('./routes/index.routes'))
app.use('/accounts', require('./routes/account.routes'))
app.use(require('./routes/client.routes'))
app.use(require('./routes/payment.routes'))
app.use(require('./routes/service.routes'))
app.use('/transfers', require('./routes/transfer.routes'))

app.use('/auth', require('./routes/auth.routes'))
