const express = require('express')
const app = express()
const PORT = 3000
const razorpay = require('razorpay')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

// app.get('/',(req,res)=>{
//     res.sendFile('index.html')
// })


app.post("/payment",async(req,res)=>{
    let {amount} = req.body;
    var instance = new razorpay({key_id: 'rzp_test_q0ag3ilCXcilD1', key_secret: 'RY2jus2NXo9I7wJxh0wRQzwV'})
    let order = await instance.orders.create({
        amount: amount*100,
        currency: 'INR',
        receipt: 'receipt1',
    })

    res.status(201).json({
        success: true,
        order,
        amount
    })
});


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})
//