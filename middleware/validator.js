const Joi = require('joi');
const middleware = (schema, method) => {
	if (method.includes('post') || method.includes('update')) {
		return (req, res, next) => {
			const { error } = schema.validate(req.body);
			const valid = error == null;

			if (valid) {
				next();
			} else {
				// next(error)
				const { details } = error;
				const message = details.map(i => i.message).join(',');
				console.log("error", message);
				res.status(422).json({ error: message })
			}
		}
	}
	else if (method.includes('get')) {
		return (req, res, next) => {
			const { error } = schema.validate(req.params);
			const valid = error == null;

			if (valid) {
				next();
			} else {
				// next(error)
				const { details } = error;
				const message = details.map(i => i.message).join(',');
				console.log("error", message);
				res.status(400).json({ error: message })
			}
		}
	}
	else if (method.includes('patch')) {
		return (req, res, next) => {
			const { error } = schema.validate(req.params);
			if (error == null) {
				const { error } = schema.validate(req.body)
				const valid = error == null;

				if (valid) {
					next();
				} else {
					// next(error)
					const { details } = error;
					const message = details.map(i => i.message).join(',');
					console.log("error", message);
					res.status(400).json({ error: message })
				}
			}
			else {
				const { details } = error;
				const message = details.map(i => i.message).join(',');
				console.log("error", message);
				res.status(400).json({ error: message })
			}
		}
	}
}
module.exports = middleware;