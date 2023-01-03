const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const AuthRoute = require('./Routes/Auth.route')
const { verifyAccessToken } = require('./helpers/jwt_helper')
require('dotenv').config()
require('./helpers/init_mongo')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", verifyAccessToken, async(req,res,next)=>{
    res.send("Hello")
})

app.use('/auth',AuthRoute)

app.use(async(req,res,next)=>{
    next(createError.NotFound())
})


app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message,
        }
    })
})

const PORT = process.env.PORT||3000

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})

//