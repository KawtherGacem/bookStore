const mongoose = require('mongoose')
mongoose.set('debug', true);

const authorSchema = new mongoose.Schema({
    name:{
        type: String ,
        required: true
    }
})

module.exports = mongoose.model('Author',authorSchema)