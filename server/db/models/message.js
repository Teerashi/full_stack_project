'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.Chat, { foreignKey: 'chatId', as: 'chat' });
      Message.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
    }
  }
  Message.init({
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Text is required for creating a message'
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      field: "author_id",
        allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      validate: {
        notEmpty: {
          msg: 'Author Id is required for creating a message'
        }
      }
    },
    chatId: {
      type: DataTypes.INTEGER,
      field: "chat_id",
      allowNull: false,
      references: {
        model: 'Chats',
        key: 'id'
      },
      validate: {
        notEmpty: {
          msg: 'Chat Id is required for creating a message'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Message',
    tableName: "messages",
    underscored: true
  });
  return Message;
};