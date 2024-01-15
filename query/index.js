const express= require('express')
const bodyParser= require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const posts = {}

app.get('/post', (req,res) => {
    res.send(posts)
})


app.post('/events', (req,res) => {
    const { type, data } = req.body

    if (type === 'PostCreated'){
        const { id, title } = data

        posts[id] = { id, title, comments: [] }

    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data
        const post = posts[postId]
        post.comments.push({ id, content, status })

    }

    if (type == 'CommentUpdated'){
        const { id, content, postId, status } = data
         
    }
    console.log(posts)
    res.send({})
})

app.listen(4002, () => {
    console.log('Listinening on 4002')
})