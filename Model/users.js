const mongoose = require('mongoose')

//task schema
const userSchema = new mongoose.Schema({
    username:{type: String, required:true},
    password:{type: String, required:true},
    firstName:{type: String, required:true},
    lastName:{type: String, required:true},
    email:{type: String, required:true}
})
module.exports = mongoose.model('users', userSchema)