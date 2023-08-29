const OrderService = require('../services/orderService')
const service = new OrderService()

class OrderController {
	async create(req, res, next) {
		try {
			const order = await service.create(req.body)
			res.status(201).send(order)
		}
		catch (error) {
			next(error)
		}
	}

	async findall(req, res, next) {
		try {
			const orders = await service.findall()
			res.status(200).send(orders)
		}
		catch (error) {
			next(error)
		}
	}

	async findone(req, res, next) {
		const id = req.params.id
		try {
			const order = await service.findone(id)
			res.status(200).send(order)
		}
		catch (error) {
			next(error)
		}
	}

	async delete(req, res, next) {
		const id = req.params.id
		try {
			const order = await service.delete(id)
			res.status(200).send(order)
		}
		catch (error) {
			next(error)
		}
	}

}

module.exports = OrderController