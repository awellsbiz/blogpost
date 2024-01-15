const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())

//this service just watches for any request going to our events end points. This is where we ware going to revieve events from the event broker.
app.post('/events', async (req, res) => {
    const { type, data } = req.body

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approve'

        //make a request over to the event bus and make sure to include the comment with the udated status

        await axios.post('http://localhost:4005/events', {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }
    res.send({})
})



app.listen(4003, () => {
    console.log('running 4003 from moderation service')
})