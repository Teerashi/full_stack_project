'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatToUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatToUser.init({
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "chat_id",
      references: {
        model: 'Chat',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ChatToUser',
    tableName: 'chats_to_users',
    underscored: true,
    timestamps: false
  });
  return ChatToUser;
};