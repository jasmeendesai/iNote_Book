const express = require('express')
const route = express.Router()

const {createNotes, getNotes, updateNotes, deleteNotes}=require('../controller/notesController')
const {auth} = require('../middleware/userAuth')

route.post('/creteNotes', auth, createNotes)
route.get('/getNotes', auth, getNotes)
route.put('/update/:id', auth, updateNotes)
route.delete('/delete/:id', auth, deleteNotes)

module.exports = route