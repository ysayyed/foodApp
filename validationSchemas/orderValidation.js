const Joi = require('joi')

const schemas = {
	Create: Joi.object().keys({
		amt: Joi.number().required(),
		recipes: Joi.array().items({
			recipeId: Joi.number().required(),
			recipeQty: Joi.number().required()
		}
		),
		modifiers: Joi.array().items({
			recipeId: Joi.number().required(),
			modifierId: Joi.number().required(),
			modifierQty: Joi.number().required()
		})
	}),
	FindOne: Joi.object().keys({
		id: Joi.number().required()
	}),
}

module.exports = schemas