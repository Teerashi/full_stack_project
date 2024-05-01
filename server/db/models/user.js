const bcrypt = require('bcrypt');
const {SALT_ROUNDS} = require('../constants');

'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      Chat.belongsToMany(models.User, {
        through: 'ChatToUser',
        as: 'users',
        foreignKey: 'userId',
        otherKey: 'chatId'
      });
    }
    static async hashPassword(user) {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      }
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING(128),
      field: 'first_name',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name cannot be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING(128),
      field: 'last_name',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last name cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    },
    picturePath: {
      type: DataTypes.STRING,
      field: 'picture_path',
      validate: {
        notEmpty: true
      }
    },
    isMale: {
      type: DataTypes.BOOLEAN,
      field: 'is_male'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    hooks: {
      beforeCreate: User.hashPassword,
      beforeUpdate: User.hashPassword
    }
  });

  return User;
};