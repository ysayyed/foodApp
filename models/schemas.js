const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')

const Product = sequelize.define('product', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		required: true,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Product name should not be empty!`
			}
		}
	},
	price: {
		type: DataTypes.SMALLINT,
		required: true,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Price should not be Empty!"
			}
		}
	}
}, { timestamps: false }
)

const Recipe = sequelize.define('recipe', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		required: true,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Product name should not be empty!`
			}
		}
	},
	price: {
		type: DataTypes.SMALLINT,
		required: true,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Price should not be Empty!"
			}
		}
	},
	ingredients: {
		type: DataTypes.JSON(
			{
				recipeId: DataTypes.INTEGER, qty: DataTypes.TINYINT
			}
		)
	}
}, { timestamps: false }
)

const Order = sequelize.define('order', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	amt: {
		type: DataTypes.SMALLINT,
		required: true,
	}
}, { timestamps: false }
)

const RecipeOrder = sequelize.define('recipe_quantity', {
	recipeOrderid: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	Qty: {
		type: DataTypes.INTEGER,
		allowNull: true,
	}
},
	{ timestamps: false }
)


const Modifier = sequelize.define('modifier', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		required: true,
		allowNull: false,
		validate: {
			notNull: {
				msg: `Modifier name should not be empty!`
			}
		}
	},
	price: {
		type: DataTypes.SMALLINT,
		required: true,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Modifier should not be Empty!"
			}
		}
	},
},
	{ timestamps: false }
)

const RecipeModifier = sequelize.define('modifier_quantity', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},

	Qty: {
		type: DataTypes.INTEGER,
		allowNull: true,
	}
},
	{ timestamps: false }
)

Order.belongsToMany(Recipe, { through: { model: RecipeOrder, unique: false } })
Recipe.belongsToMany(Order, { through: { model: RecipeOrder, unique: false } })

Modifier.belongsToMany(Recipe, { through: { model: RecipeModifier, unique: false } })
Recipe.belongsToMany(Modifier, { through: { model: RecipeModifier, unique: false } })

Modifier.belongsToMany(Order, { through: { model: RecipeModifier, unique: false } })
Order.belongsToMany(Modifier, { through: { model: RecipeModifier, unique: false } })

let recipe, modifier
sequelize.sync(
	{
		alter: true
	})
	.then(
		async () => {

		}
	).then(async (data) => {

	})
	.then(async (data) => {
	})

module.exports = {
	Product,
	Recipe,
	Order,
	Modifier,
}