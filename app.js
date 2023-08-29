const express = require('express')
const productRouter = require('./routes/productRoutes')
const recipeRouter = require('./routes/recipeRoutes')
const orderRouter = require('./routes/orderRoutes')
const modifierRouter = require('./routes/modifierRoutes')
const sequelize = require('./db/db')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/product', productRouter)
app.use('/recipe', recipeRouter)
app.use('/order', orderRouter)
app.use('/modifier', modifierRouter)
app.use(errorHandler)



app.listen(process.env.PORT, process.env.HOST, async () => {
	console.log(`Server is running on port : ${process.env.PORT}`)
})
