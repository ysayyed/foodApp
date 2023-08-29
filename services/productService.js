const Product = require('../models/schemas').Product

class ProductService {
	async create(payload) {
		try {
			const product = await Product.create(payload)
			return product
		}
		catch (error) {
			throw new Error(error)
		}
	}

	async findall() {
		try {
			const products = await Product.findAll()
			return products
		}
		catch (error) {
			throw new Error(error)
		}
	}

	async findone(id) {
		try {
			const product = await Product.findByPk(id)
			if (product !== null) {
				return product
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

	async update(id, payload) {
		try {
			const product = await Product.findByPk(id)
			if (product !== null) {
				try {
					const updated = await Product.update(payload, { where: { id: id } })
					console.log('in inner try')
					return updated
				}
				catch (error) {
					console.log('in inner catch')
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
			const product = await Product.findByPk(id)
			if (product !== null) {
				await Product.destroy({ where: { id: id } })
				return { message: `Product with id ${id} deleted successfully.` }
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

}

module.exports = ProductService