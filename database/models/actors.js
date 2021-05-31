'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Actors.belongsTo(models.Events,  {foreignKey: {
          name: 'event_id'
        }
      });
    }
  }
  Actors.init(
    {
      login: DataTypes.STRING,
      id:{
        allowNull: false,
        primaryKey: true,
          unique: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
      },
      avatar_url: DataTypes.STRING,
        actor_id: {
            allowNull: false,
            type: DataTypes.BIGINT,
        }
    },
    {
      sequelize,
      modelName: 'Actors',
    }
  );

  return Actors;
};
