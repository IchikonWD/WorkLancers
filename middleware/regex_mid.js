const Joi = require('joi')


const auth_schema = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    age: Joi.date()
    .min('1925-1-1')
    .max('2022-1-1'),
    occupation: Joi.string().max(180),
    location: Joi.string().max(20),
    skills: Joi.string()
})

module.exports = { auth_schema }