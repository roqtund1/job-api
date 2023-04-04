const Joi = require('joi');

// validate User
function validate(User, type){

    if(type){
        
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(255).required()
        });

        return schema.validate(User)
    }

    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(255).required()
    });

    return schema.validate(User)
}


module.exports = validate;