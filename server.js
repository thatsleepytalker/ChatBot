const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)


app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const messages = [
    {name: 'Me', message: 'I am the best'},
    {name: 'Myself', message: 'I can do it'}
]

app.get('/messages', (req,res)=>{
    res.send(messages)
})

app.post('/messages', (req, res)=>{
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket)=>{
    console.log('User Connected!!!')
})

const server = http.listen(3000, ()=>{
    console.log('listening on port', server.address().port)
})