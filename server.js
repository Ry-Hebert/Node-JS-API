require('dotenv').config()

const Express = require('express')
const Mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Todos = require('./models/todos')
const Categories = require('./models/categories')

const server = new Express()

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

Mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

server.listen(process.env.PORT || 3001, () =>{
    console.log('Server is running now')
})

server.get('/todos', (req, res) => {
    Todos.find({}, (err, todos) =>{

        if(err){console.log(handleError(err))}
        res.json(todos)
    })
})

server.get('/categories', (req, res) => {
    Categories.find({}, (err, categories) =>{

        if(err){console.log(handleError(err))}
        res.json(categories)
    })
})

server.post('/todos', (req, res) => {
    console.log(req.query)
    
    Todos.create({
    key: Math.random() * (99999 - 1) + 1,
    todo: req.query.todo,
    category: req.query.category
    })
})

server.post('/categories', (req, res) => {
    console.log(req.query)
    
    Categories.create({
    category: req.query.category
    })
})

server.put('/todos/:id', (req, res) =>{
    Todos.findById(req.params.id, (err, todo) =>{
        if(err){console.log(handleError(err))}
        todo.update(req.query, (err) =>{
            if(err){console.log(handleError(err))}
            Todos.find({}, (err, todoX) =>{
                if(err){console.log(handleError(err))}
                res.json(todoX)
            })
        })
    })
})

server.put('/categories/:id', (req, res) =>{
    Categories.findById(req.params.id, (err, category) =>{
        if(err){console.log(handleError(err))}
        category.update(req.query, (err) =>{
            if(err){console.log(handleError(err))}
            Categories.find({}, (err, categoryX) =>{
                if(err){console.log(handleError(err))}
                res.json(categoryX)
            })
        })
    })
})

server.delete('/todos/:id', (req, res) =>{
    Todos.remove({_id: req.params.id}, (err) => {
        if(err){console.log(handleError(err))}
        Todos.find((err, todo) =>{
            if(err){console.log(handleError(err))}
            res.json(todo)
        })
    })
})

server.delete('/categories/:id', (req, res) =>{
    Categories.remove({_id: req.params.id}, (err) => {
        if(err){console.log(handleError(err))}
        Categories.find((err, category) =>{
            if(err){console.log(handleError(err))}
            res.json(category)
        })
    })
})