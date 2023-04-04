const { UnauthenticatedError } = require("../errors");
const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {

    const authHeader = req.header('authorization');
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Access denied. No token provided.')
    }

    //token
    const token = authHeader.split(' ')[1];

    try {

        const payload = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = payload;

        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid token.')
    }
}