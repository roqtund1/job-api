const Joi = require('joi');

// validate job
function validate(job){
    const schema = Joi.object({
        company: Joi.string().min(3).max(50).required(),
        position: Joi.string().min(3).max(100).required()
    })

    return schema.validate(job);
}

module.exports = validate;