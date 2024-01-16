const express= require('express')
const bodyParser= require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const posts = {}

const handleEvent = (type, data) => {
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
        const post = posts[postId]
        const comment = post.comments.find(comment => {
            return comment.id === id
         })
        
         comment.status = status
         comment.content = content 
    }
    
}

app.get('/post', (req,res) => {
    res.send(posts)
})


app.post('/events', (req,res) => {
    const { type, data } = req.body

    handleEvent(type, data)
   
    res.send({})
})

app.listen(4002, async () => {
    //when our query server comes on line and begins to listen on prt 4002 it sends a console log. Then, its a good time to send a get request over to the evnt bus to get a list of all the events that have been submitted over time
    console.log('Listinening on 4002')

    //when doing a get request dont forget to useing axios- you  got to include the 'try catch block
    try {
        //create response variable that recieves all of the events- this should send back an object/array/something 
        const res = await axios.get('http://localhost:4005/events')
    
        for (let event of res.data) {
            console.log('processing event:', event.type)
    
            handleEvent(event.type, event.data)
        }

    } catch (error) {
        console.log(error.message)
    }
})