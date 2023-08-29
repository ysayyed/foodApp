const ProductService = require('../services/productService')
const service = new ProductService()

class ProductController {
	async create(req, res, next) {
		try {
			const product = await service.create(req.body)
			console.log(product)
			res.status(201).send(product)
		}
		catch (error) {
			next(error)
		}
	}

	async findall(req, res, next) {
		try {
			const products = await service.findall()
			res.status(200).send(products)
		}
		catch (error) {
			next(error)
		}
	}

	async findone(req, res, next) {
		const id = req.params.id
		try {
			const product = await service.findone(id)
			res.status(200).send(product)
		}
		catch (error) {
			next(error)
		}
	}

	async update(req, res, next) {
		const id = req.params.id
		const payload = req.body
		try {
			try {
				await service.update(id, payload)
				const product = await service.findone(id)
				res.status(200).send(product)
			}
			catch (error) {
				next(error)
			}
		}
		catch (error) { next(error) }
	}

	async delete(req, res, next) {
		const id = req.params.id
		try {
			const product = await service.delete(id)
			res.status(200).send(product)
		}
		catch (error) {
			next(error)
		}
	}

}

module.exports = ProductController