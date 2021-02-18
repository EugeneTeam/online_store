'use strict';
const {CRUDOptimisation} = require('../utils/CRUDOptimization');

module.exports = class CharacteristicValue extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      characteristicId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.INTEGER,
        references: {
          model: 'Characteristics'
        },
        onDelete: 'CASCADE'
      },
      valueId: {
        allowNull: false,
        primaryKey: true,
        type: DataType.INTEGER,
        references: {
          model: 'Values'
        },
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
