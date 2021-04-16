const express = require('express')
const app = express()

const port = 4000 || process.env.PORT

require('./database')

app.use(express.json())


app.listen(port, ()=>{
  console.log(`listen on port ${port}`)
})

app.use(require('./routes/account.route'))
app.use(require('./routes/client.route'))
app.use(require('./routes/payment.route'))
app.use(require('./routes/service.route'))
app.use(require('./routes/transfer.route'))
