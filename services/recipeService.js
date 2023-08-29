const { Order, Modifier } = require('../models/schemas')

const Recipe = require('../models/schemas').Recipe

class RecipeService {
	async create(payload) {
		try {
			const recipe = await Recipe.create(payload)
			return recipe
		}
		catch (error) {
			throw new Error("Recipe can't be created!")
		}
	}

	async findall() {
		try {
			const recipes = await Recipe.findAll(
				{
					attributes: ['id', 'name', 'ingredients'],
					include: [{
						model: Order,
						attributes: []
					},
					{
						model: Modifier,
						attributes: []
					}]
				}
			)
			return recipes
		}
		catch (error) {
			throw new Error(error)
		}
	}

	async findone(id) {
		try {
			const recipe = await Recipe.findOne(
				{
					where: { id: id },
					attributes: ['id', 'name', 'ingredients'],
					include: [{
						model: Order,
						attributes: []
					},
					{
						model: Modifier,
						attributes: []
					}]
				}
			)
			if (recipe !== null) {
				return recipe
			}
			else {
				const err = new Error(`Recipe with id ${id} not found!`)
				throw err.message
			}
		}
		catch (error) {
			throw new Error(error)
		}
	}

	async update(id, payload) {
		try {
			const recipe = await Recipe.findByPk(id)
			if (recipe !== null) {
				try {
					const updated = await Recipe.update(payload, { where: { id: id } })
					return updated
				}
				catch (error) {
					const err = new Error('Cannot update!')
					throw err.message
				}
			}
			else {
				const err = new Error(`Product with id ${id} not found!`)
				throw err.message
			}
		}
		catch (error) {
			throw new Error(error)
		}
	}

	async delete(id) {
		try {
			const recipe = await Recipe.findByPk(id)
			if (recipe !== null) {
				await Recipe.destroy({ where: { id: id } })
				return { message: `Recipe with id ${id} deleted successfully.` }
			}
			else {
				const err = new Error(`Recipe with id ${id} not found!`)
				throw err.message
			}
		}
		catch (error) {
			throw new Error(error)
		}
	}

}

module.exports = RecipeService