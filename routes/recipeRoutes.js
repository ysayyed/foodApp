const Router = require('express').Router
const RecipeController = require('../controllers/recipeController')
const middleware = require('../middleware/validator')
const schemas = require('../validationSchemas/recipeValidation')
const controller = new RecipeController()
const router = Router()

router.post('/', middleware(schemas.Create, 'post'), controller.create)
router.get('/', controller.findall)
router.get('/:id', middleware(schemas.FindOne, 'get'), controller.findone)
router.delete('/:id', middleware(schemas.FindOne, 'get'), controller.delete)

module.exports = router