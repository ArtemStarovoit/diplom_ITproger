import express from 'express'
import { connect } from 'mongoose'
import {MONGO, PORT} from './config'
import { Items } from './models/articles-items'
import { Comments } from './models/comments'
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

connect(MONGO, (err) => {
    if(err) throw err
    console.log('Мы подключились')
})

app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/api/articles-items', async (req, res) => {
    try {
        const getItems = await Items.find().sort({id:1})
        if(!getItems) throw new Error('Не найдены статьи')
        res.status(200).send(getItems)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.get('/api/articles-items/:id', async (req, res) => {
    try {
        const getItem = await Items.findOne({id: req.params.id})
        const getComments = await Comments.find({id: req.params.id})
        if(!getItem || !getComments) throw new Error('Не найдена статья')
        res.status(200).send(getItem).send(getComments)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.get('/api/articles-items/comments/:id', async (req, res) => {
    try {
        const getComments = await Comments.find({id: req.params.id})
        if(!getComments) throw new Error('К данной статье коментариев не найдено')
        res.status(200).send(getComments)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.post('/api/articles-items', async (req, res) => {
    try {
        const result = await Comments.insertMany(req.body)
        if(!result) throw new Error('Коментарий не добавлен')
        res.status(200).send(result)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.listen(PORT, () => {
    console.log('Сервер запущен')
})