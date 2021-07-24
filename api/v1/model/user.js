const mongoose = require('mongoose')
const { Schema } = mongoose

const User = Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    phone : {
        type : Number,
        require : true
    },
    password : {
        type : String,
        require : true
    }
},{ timestamps : true })

module.exports = mongoose.model(`user`,User)