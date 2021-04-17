const express = require('express')
const morgan = require('morgan')
const app = express()

const port = 4000 || process.env.PORT

require('./database')

app.use(express.json())
app.use(morgan())

app.listen(port, ()=>{
  console.log(`listen on port ${port}`)
})

app.use(require('./routes/account.routes'))
app.use(require('./routes/client.routes'))
app.use(require('./routes/payment.routes'))
app.use(require('./routes/service.routes'))
app.use(require('./routes/transfer.routes'))
