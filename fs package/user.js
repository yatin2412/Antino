const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    Name :String,
    Last_Name:String,
    Age: Number,
    Phone: Number,
    Email: String,
    Error: String
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
