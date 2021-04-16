const express = require('express')
const app = express()

const port = 4000 || process.env.PORT

require('./database')

app.use(express.json())
app.use(require('../src/routes'))

app.listen(port, ()=>{
  console.log(`listen on port ${port}`)
})

app.use(require('./routes'))