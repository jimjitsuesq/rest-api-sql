'use strict';
const { Sequelize, DataTypes, Model} = require('sequelize');
const db = require('.');
const bcrypt = require('bcrypt');

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
        unique: true,
        validate: {
          notNull: {
            msg: 'Please provide an Email Address',
          },
          isEmail: {
            msg: 'PLease provide a valid Email Address'
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
    hooks: {
      beforeCreate: async function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      }
    }
  });
  
  User.associate = (models) => {
    User.hasMany(models.Course, {
        foreignKey: {
            fieldName: 'userId'
        },
    });
  };

  return User;
};