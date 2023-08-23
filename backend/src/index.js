const express = require('express')
const {connectMongo}=require('./db')
const cors = require('cors')

require('dotenv').config()
const {PORT,MONGODB_STRING}=process.env

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


connectMongo(MONGODB_STRING)

app.use('/api/user', require('./route/user'))
app.use('/api/notes', require('./route/notes'))

app.listen(PORT,()=>{
    console.log(`Express is app is running on port ${PORT}`)
})