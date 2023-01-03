require('dotenv/config')
const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')

const app = express()
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey:process.env.AWS_SECRET
})



const storage = multer.memoryStorage({
    destination: function(req,res,callback){
        callback(null,'')
    }
})
const upload = multer({storage}).single('image')

app.post('/upload',upload,(req,res)=>{

    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length -1]


    console.log(req.file)
    let value = Math.floor(Math.random()*6)
    const params ={
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${value}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params,(error,data)=>{
        if(error){
            res.status(500).send(error)
        }
        res.status(200).send(data)
    })
})
app.listen(3000,()=>{
    console.log("Server is set")
})