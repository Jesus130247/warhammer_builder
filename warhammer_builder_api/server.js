// require('dotenv').config()
const express = require('express')
const app = express()
const port = 8080
// const db = require('./db')
const armyInfoRouter = require('./routes/army_info_router')
// const authRouter = require('./routes/auth_router')
const errorHandler = require('./middlewares/error_handler')
const expressListRoutes = require('express-list-routes')
const newApi = require('./routes/army_router')

// app.use(express.static('client'))
app.use(express.json())
// app.use(authRouter)
app.use(armyInfoRouter)
app.use(newApi)

app.get('/', (req,res) => {
    res.send('warhammer_api')
})

app.use(errorHandler)

expressListRoutes(app)

app.listen(port, ()=>{
    console.log('server listeneing on port', port)
})