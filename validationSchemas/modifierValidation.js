const Joi = require('joi')

const schemas = {
	Create: Joi.object().keys({
		name: Joi.string().required(),
		price: Joi.number().required()
	}),
	FindOne: Joi.object().keys({
		id: Joi.number().required()
	}),
	Update: Joi.object().keys({
		id: Joi.number().alter({
			patch: (schema) => schema.required()
		}),
		name: Joi.string().optional(),
		price: Joi.number().optional()
	})

}

module.exports = schemas