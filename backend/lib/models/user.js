'use strict'
const { v4: uuidv4 } = require('uuid')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.News, {
      //   foreignKey: 'authorId',
      // })
    }

    toJSON() {
      // hide protected fields
      const attributes = Object.assign({}, this.get())
      delete attributes.password
      return attributes
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        required: true,
      },
      lastName: {
        type: DataTypes.STRING,
        required: true,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        validate: {
          isEmail: true,
        },
      },
      role: {
        type: DataTypes.ENUM,
        values: ['admin', 'author'],
        required: true,
      },
      phone: {
        type: DataTypes.STRING,
        required: false,
      },
      password: {
        type: DataTypes.STRING,
        required: true,
      },
      calculateEPF: {
        type: DataTypes.BOOLEAN,
        required: true,
      },
      NIC: {
        type: DataTypes.STRING,
        required: false,
        validate: {
          len: [10, 12],
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'User',
    }
  )
  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get())

    delete values.password
    return values
  }
  User.beforeCreate((row) => (row.id = uuidv4()))
  return User
}
