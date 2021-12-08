const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

if (MONGO_URL && !mongoose.connection.readyState) {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(res => {
    console.log("DB connected")
  }).catch(err => {
    console.log("Error: ", err.message)
  })
}

module.exports = {
  Todo
}
