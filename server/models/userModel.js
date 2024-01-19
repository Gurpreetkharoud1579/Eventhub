const mongoose = require('mongoose')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({
    firstName : {
        type: String,
        default: ''
    },
    lastName : {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    contactNumber: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    province: {
        type: String,
        default: ''
    },
    zipCode: {
        type: String,
        default: ''
    },
    email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : String,
    userType : String,
    approvalEvent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'event',
    },
    registeredEvent: []
});


const userModel = mongoose.model('user', userSchema); 

module.exports = userModel;
