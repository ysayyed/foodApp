const ModifierService = require('../services/modifierService')
const service = new ModifierService()

class ModifierController {
	async create(req, res, next) {
		try {
			const modifier = await service.create(req.body)
			console.log(modifier)
			res.status(201).send(modifier)
		}
		catch (error) {
			next(error)
		}
	}

	async findall(req, res, next) {
		try {
			const modifiers = await service.findall()
			res.status(200).send(modifiers)
		}
		catch (error) {
			next(error)
		}
	}

	async findone(req, res, next) {
		const id = req.params.id
		try {
			const modifier = await service.findone(id)
			res.status(200).send(modifier)
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
				const modifier = await service.findone(id)
				res.status(200).send(modifier)
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
			const modifier = await service.delete(id)
			res.status(200).send(modifier)
		}
		catch (error) {
			next(error)
		}
	}

}

module.exports = ModifierController