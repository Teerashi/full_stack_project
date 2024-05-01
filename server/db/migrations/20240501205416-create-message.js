'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      authorId: {
        type: Sequelize.INTEGER,
        field: "author_id",
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        validate: {
          notEmpty: {
            msg: "Author id cannot be empty"
          }
        }
      },
      chatId: {
        type: Sequelize.INTEGER,
        field: "chat_id",
        allowNull: false,
        references: {
          model: 'chats',
          key: 'id'
        },
        validate: {
          notEmpty: {
            msg: "Chat id cannot be empty"
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at"
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at"
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  }
};