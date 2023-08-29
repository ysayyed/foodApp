const Modifier = require('../models/schemas').Modifier

class ModifierService {
	async create(payload) {
		try {
			const modifier = await Modifier.create(payload)
			return modifier
		}
		catch (error) {
			throw new Error(error)
		}
	}

	async findall() {
		try {
			const modifiers = await Modifier.findAll()
			return modifiers
		}
		catch (error) {
			throw new Error(error)
		}
	}

	async findone(id) {
		try {
			const modifier = await Modifier.findByPk(id)
			if (modifier !== null) {
				return modifier
			}
			else {
				const err = new Error(`Modifier with id ${id} not found!`)
				throw err.message
			}
		}
		catch (error) {
			throw new Error(error)
		}
	}

	async update(id, payload) {
		try {
			const modifier = await Modifier.findByPk(id)
			if (modifier !== null) {
				try {
					const updated = await Modifier.update(payload, { where: { id: id } })
					return updated
				}
				catch (error) {
					const err = new Error('Cannot update!')
					throw err.message
				}
			}
			else {
				const err = new Error(`Modifier with id ${id} not found!`)
				throw err.message
			}
		}
		catch (error) {
			throw new Error(error)
		}
	}

	async delete(id) {
		try {
			const modifier = await Modifier.findByPk(id)
			if (modifier !== null) {
				await Modifier.destroy({ where: { id: id } })
				return { message: `Modifier with id ${id} deleted successfully.` }
			}
			else {
				const err = new Error(`Modifier with id ${id} not found!`)
				throw err.message
			}
		}
		catch (error) {
			throw new Error(error)
		}
	}

}

module.exports = ModifierService