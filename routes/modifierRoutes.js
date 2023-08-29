const Router = require('express').Router
const ModifierController = require('../controllers/modifierController')
const middleware = require('../middleware/validator')
const schemas = require('../validationSchemas/modifierValidation')
const controller = new ModifierController()
const router = Router()

router.post('/', middleware(schemas.Create, 'post'), controller.create)
router.get('/', controller.findall)
router.get('/:id', middleware(schemas.FindOne, 'get'), controller.findone)
router.patch('/:id', middleware(schemas.Update, 'patch'), controller.update)
router.delete('/:id', middleware(schemas.FindOne, 'get'), controller.delete)

module.exports = router