'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chat.belongsToMany(models.User, {
        through: 'ChatToUser',
        as: 'chats', 
        foreignKey: 'chatId', 
        otherKey: 'userId' 
      });
    }
  }
  Chat.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        msg: "Chat name cannot be empty"
      }
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      field: "is_private",
      defaultValue: true
    },
    coverImage: {
      type: DataTypes.STRING,
      field: "cover_image",
      allowNull: true,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Chat',
    tableName: 'chats',
    underscored: true
  });
  return Chat;
};