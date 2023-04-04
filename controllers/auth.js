const { BadRequest } = require('../errors');
const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const validate = require('../validations/validate-user');


// register user
const register = async (req, res) => {

    const body = req.body

    // validate inputs
    const { error } = validate(body);
    if(error) {
        throw new BadRequest(error.details[0].message)
    }

    let user = await User.findOne({email: body.email});
    if(user) throw new BadRequest('User already exits.')

    user = await User.create(body)

    // token
    const token = user.generateAuthToken();

    res.status(StatusCodes.CREATED).json({token})
}


// login user
const login = async (req, res) => {

    const body = req.body;

    // validate inputs
    const { error } = validate(body, 'login');
    if(error) {
        throw new BadRequest(error.details[0].message)
    }

    let user = await User.findOne({email: body.email});
    if(!user) throw new BadRequest('Invalid email or password.');

    // validate password
    const isValid = await user.validatePassword(body.password);
    if(!isValid) throw new BadRequest('Invalid email or password.');

    // token
    const token = user.generateAuthToken();

    res.json({token})
}


module.exports = {
    register,
    login
}