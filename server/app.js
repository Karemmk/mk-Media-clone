const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const port = 5000
const {MONGOURI} = require('./keys')
const bodyParser = require('body-parser')

require('./models/user')
require('./models/post')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

app.use(require('./routes/auth'))
app.use(require('./routes/post'))

mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
  console.log('connected to mongo')
})

mongoose.connection.on('error',(err)=>{
  console.log('err connected',err)
})

app.listen(port,()=>{
    console.log('server is running',port)
})