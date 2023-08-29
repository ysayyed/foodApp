const { Recipe, Modifier, RecipeModifier } = require('../models/schemas')

const Order = require('../models/schemas').Order

class OrderService {
	async create(payload) {
		try {
			const { amt, ...rest } = payload
			console.log(amt)
			const order = await Order.create({ amt: amt })
			const { recipes, modifiers } = rest
			const addAll = async () => {
				try {
					await recipes.forEach(async (element) => {
						await order.addRecipes(element.recipeId, { through: { Qty: element.recipeQty } })
						console.log(element)
					})

					await modifiers.forEach(async (element) => {
						await order.addModifiers(element.modifierId, { through: { recipeId: element.recipeId, Qty: element.modifierQty } })
						console.log(element)
					})
				}
				catch (error) {
					const err = new Error("Can't create order with recipes and modifiers")
					throw err.message
				}
			}
			await addAll()
			return { order, message: "Order created successfully" }
		}
		catch (error) {
			throw new Error("Order can't be created. Something went wrong!")
		}
	}

	async findall() {
		try {
			const orders = await Order.findAll({
				where:{},
				attributes: ['id', 'amt'],
				include: [{
					model: Recipe,
					attributes: ['id', 'name'],
					required: true,
					through: {
						attributes: ['Qty']
					}
				},
				{
					model: Modifier,
					required: true,
					through: {
						attributes: ['Qty' , 'recipeId']
					}	
				}]
			})
			return orders
		}
		catch (error) {
			throw new Error(error)
		}
	}

	async findone(id) {
		try {
			const order = await Order.findOne(
				{
					where: { id: id },
					include: [{
						model: Recipe,
						attributes: ['id', 'name'],
						required: true,
						through: {
							attributes: ['Qty']
						}
					},
					{
						model: Modifier,
						required: true,
						through: {
							attributes: ['Qty' , 'recipeId']
						}	
					}]
				}
			)
			if (order !== null) {
				return order
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

	async delete(id) {
		try {
			const order = await Order.findByPk(id)
			if (order !== null) {
				await Order.destroy({ where: { id: id } })
				return { message: `Order with id ${id} deleted successfully.` }
			}
			else {
				const err = new Error(`Order with id ${id} not found!`)
				throw err.message
			}
		}
		catch (error) {
			throw new Error(error)
		}
	}

}

module.exports = OrderService