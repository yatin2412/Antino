const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    phone: Number
})

// UserSchema.pre('save',async function(next){
//     try{
//         console.log("called before saving a user")
//     }
//     catch(error){
//         next(error)
//     }
// })
module.exports = mongoose.model("User",UserSchema);
