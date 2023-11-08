const mongoose = require('mongoose')
const mongodbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/?retryWrites=true&w=majority`

mongoose.connect(mongodbUrl)

const db = mongoose.connection
db.on('error', (err) => console.error(`err: ${err}`))
db.on('connected', (err, res) => console.log('Connected to database'))