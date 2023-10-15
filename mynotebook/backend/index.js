const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
const connectToMoongo =require('./db.js')

app.use(express.json())

app.use('/api/notes',require('./routes/notes.js'))
app.use('/api/auth',require('./routes/auth.js'))





app.listen(port, () => {
  console.log(`Example app listening on port http://localhost/${port}`)
})

connectToMoongo();