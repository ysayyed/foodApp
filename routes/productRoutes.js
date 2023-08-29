const Router = require('express').Router
const ProductController = require('../controllers/productController')
const middleware = require('../middleware/validator')
const schemas = require('../validationSchemas/productValidation')
const controller = new ProductController()
const router = Router()

router.post('/', middleware(schemas.Create, 'post'), controller.create)
router.get('/', controller.findall)
router.get('/:id', middleware(schemas.FindOne, 'get'), controller.findone)
router.patch('/:id', middleware(schemas.Update, 'patch'), controller.update)
router.delete('/:id', middleware(schemas.FindOne, 'get'), controller.delete)

module.exports = router