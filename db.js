const mongoose = require('mongoose')
const mongodbUrl = 'mongodb+srv://igorgma:bf5fvAjuYVBG6dXg@unidesc.wngit1v.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(mongodbUrl)

const db = mongoose.connection
db.on('error', (err) => console.error(`err: ${err}`))
db.on('connected', (err, res) => console.log('Connected to database'))