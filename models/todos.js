const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const todosSchema = new Schema({
    key: Number,
    todo: String,
    category: String
})

module.exports = Mongoose.model('Todos', todosSchema)
