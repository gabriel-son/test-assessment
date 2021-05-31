'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Repos.belongsTo(models.Events, {foreignKey: {
          name: 'event_id'
        }
      });
    }
  }
  Repos.init(
    {
      name: DataTypes.STRING,
      id: {
          allowNull: false,
          primaryKey: true,
          unique: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
      },
      url: DataTypes.STRING,
        repo_id: {
            allowNull: false,
            type: DataTypes.BIGINT,
        }
    },
    {
      sequelize,
      modelName: 'Repos',
    }
  );
  return Repos;
};
