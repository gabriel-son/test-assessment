'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Actors', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type:  Sequelize.INTEGER,
        autoIncrement: true,
      },
      login: {
        type: Sequelize.STRING,
      },
      avatar_url: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      actor_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      event_id: {
        type: Sequelize.BIGINT,
        onDelete: 'CASCADE',
        references: {
          model: 'Events',
          key: 'id',
          as: 'actor',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Actors');
  },
};
