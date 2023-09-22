const mongoose = require('mongoose')
const connstring = 'mongodb+srv://st10122517:<st10122517>@cluster0.gs4rulm.mongodb.net/'
mongoose.connect(connstring, {useNewUrlParser:true, useUnifiedTopology:true}).then(() =>{
    console.log('Connection established successfully')
})
.catch(error =>(
    console.error('Connection failed.')
))

//Task Schema
const taskSchema = new mongoose.Schema({
    task: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, requird: true}
})

module.exports = mongoose.model('tasks', taskSchema)