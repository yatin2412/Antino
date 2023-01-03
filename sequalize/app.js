const express = require('express');
const { ppid } = require('process');
const app = express();
const {sequelize,User,Post} = require('./models')

app.use(express.json())
app.post('/users', async(req,res)=>{
    const { name,email,role} = req.body

    try{
        const user = await User.create({name,email,role})
        return res.json(user)
    }catch(err){
        console.log(err)
    }
})

app.get("/users",async(req,res)=>{
    try{
        const user = await User.findAll()
        res.json(user)
    }catch{err=>{
        console.log(err)
    }}
})

app.get("/users/:uuid",async(req,res)=>{
    const uuid = req.params.uuid
    try{
        const user = await User.findAll({
            where: {uuid}
        })
        res.json(user)
        console.log("found")
    }catch{err=>{
        console.log(err)
    }}
})

app.post('/posts', async (req, res) => {
    const { userUuid, body } = req.body
  
    try {
      const user = await User.findOne({ where: { uuid: userUuid } })
  
      const post = await Post.create({ body, userId: user.id })
  
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })


app.listen(5000,async(req,res)=>{
    console.log("server started")
    await sequelize.authenticate()
    console.log("Database synced")
})
///////////////