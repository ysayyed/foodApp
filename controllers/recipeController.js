const RecipeService = require('../services/recipeService')
const service = new RecipeService()

class RecipeController {
	async create(req, res, next) {
		try {
			const recipe = await service.create(req.body)
			res.status(201).send(recipe)
		}
		catch (error) {
			next(error)
		}
	}

	async findall(req, res, next) {
		try {
			const recipes = await service.findall()
			res.status(200).send(recipes)
		}
		catch (error) {
			next(error)
		}
	}

	async findone(req, res, next) {
		const id = req.params.id
		try {
			const recipe = await service.findone(id)
			res.status(200).send(recipe)
		}
		catch (error) {
			next(error)
		}
	}

	async delete(req, res, next) {
		const id = req.params.id
		try {
			const recipe = await service.delete(id)
			res.status(200).send(recipe)
		}
		catch (error) {
			next(error)
		}
	}

}

module.exports = RecipeController