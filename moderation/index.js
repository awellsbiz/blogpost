const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())

//this service just watches for events. 

app.post('/events', (req, res) => {
    
})



app.listen(4003, () => {
    console.log('running 4003 from moderation service')
})