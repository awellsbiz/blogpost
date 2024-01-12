const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')

const app = express()
app.use(bodyParser.json())

const post= {}

app.get('/posts', (req,res) => {
    res.send(post)
})

app.post('/post', (req,res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    post[id] = {
        id, title
    }
    res.status(201).send(post[id])
})

app.listen(4000, () => {
    console.log('Listening on 4000')
})