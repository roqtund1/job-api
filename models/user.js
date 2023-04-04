const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email.'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: 6,
        maxlength: 255
    }
})


// hashing
userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    
    this.password = await bcrypt.hash(this.password, salt);
})

// validate password
userSchema.methods.validatePassword = async function(inputPassword){
    const isValid = await bcrypt.compare(inputPassword, this.password)

    return isValid
}

// generate Auth Token
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({userId: this._id}, process.env.jwtPrivateKey, {expiresIn: process.env.jwt_lifetime})
    return token
}


// User model/Class
const User = mongoose.model('User', userSchema);

module.exports = User;