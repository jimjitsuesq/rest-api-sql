'use strict';
const { Sequelize, DataTypes, Model} = require('sequelize');
const db = require('.');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a First Name',
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a Last Name',
        }
      }
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide an Email Address',
          }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a Password',
          }
        }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.associate = (models) => {
    User.hasMany(models.Course, {
        foreignKey: {
            fieldName: 'userId',
            allowNull: false,
        },
    });
  };

  return User;
};