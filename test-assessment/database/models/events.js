'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Events.hasOne(models.Actors, {
        foreignKey: {
          name: 'event_id',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        as: 'actor',
      });

      Events.hasOne(models.Repos, {
        foreignKey: {
          name: 'event_id',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        as: 'repo',
      });
    }
  }
  Events.init(
    {
      type: DataTypes.STRING,
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.BIGINT,
      },
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Events',
    }
  );

  return Events;
};
