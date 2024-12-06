const express = require('express')
const app = express()
app.use(express.static('public'))
const cors = require('cors')
const postRouter = require('./routes/posts.js')
const notFOundMiddleware = require('./middlewares/notFound.js')
const loggerMiddleware = require('./middlewares/loggerMiddleware.js')
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT
const HOST = process.env.HOST


app.listen(PORT, (req, res) => {
    console.log(`Server is runnig at ${HOST}:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Post')
})

// app.use('/posts', (req, res, next) =>{
//     throw new Error('You broke everithing dude!');
// })

app.use('/posts', loggerMiddleware)

app.use('/posts', postRouter)

app.use(notFOundMiddleware)

// app.use((err, req, res, next) => {
//     console.log('Error', err.message);
//     console.error(err.stack);
//     res.status(500).send({
//         message: 'Something went wrong',
//         error: err.message
//     })

// })