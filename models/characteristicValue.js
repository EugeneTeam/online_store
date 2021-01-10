'use strict';
const {Model} = require('sequelize');

module.exports = class CharacteristicValue extends Model {
  static init(sequelize, DataType) {
    return super.init({
      characteristicId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.INTEGER,
        onDelete: 'CASCADE'
      },
      valueId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.INTEGER,
        onDelete: 'CASCADE'
      },
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate(models) {
    this.belongsTo(models.Characteristic, {
      foreignKey: 'characteristicId'
    });
    this.belongsTo(models.Value, {
      foreignKey: 'valueId'
    });
  }
}
