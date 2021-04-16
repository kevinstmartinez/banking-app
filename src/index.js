
const express = require('express')
const app = express()

const port = 4000 || process.env.PORT

app.get('/', ()=>{
  console.log('hello')
})

app.use(express.json())
app.use(require('../src/routes/index'))

app.listen(port, ()=>{
  console.log(`listen on port ${port}`)
})