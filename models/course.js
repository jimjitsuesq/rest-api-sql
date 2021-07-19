'use strict';
const { Sequelize, DataTypes, Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Course.init({
    title: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a Title',
        },
        notEmpty: {
          msg: 'Please provide a Title',
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a Description',
        },
        notEmpty: {
          msg: 'Please provide a Description',
        }
      }
    },
    estimatedTime: {
        type: DataTypes.STRING
    },
    materialsNeeded: {
        type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Course',
  });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
        foreignKey: {
            fieldName: 'userId'
        },
    });
  };

  return Course;
};