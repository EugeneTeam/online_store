'use strict';
require('dotenv').config();
const {CRUDOptimisation} = require('../utils/CRUDOptimization');
const {SALT_ROUNDS, AUTH_TOKEN_SIZE} = require('../config/constants');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
const moment = require('moment');

module.exports = class User extends CRUDOptimisation {
  static init(sequelize, DataType) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      firstName: {
        allowNull: false,
        type: DataType.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataType.STRING
      },
      phone: {
        allowNull: false,
        type: DataType.STRING,
        unique: true
      },
      email: {
        allowNull: false,
        type: DataType.STRING,
        unique: true
      },
      status: {
        allowNull: false,
        type: DataType.ENUM('ACTIVE', 'INACTIVE', 'BANNED'),
        defaultValue: 'INACTIVE'
      },
      passwordHash: {
        allowNull: false,
        type: DataType.STRING
      },
      resetToken: DataType.STRING,
      authToken: {
        allowNull: false,
        type: DataType.STRING
      },
      roleId: {
        allowNull: false,
        type: DataType.STRING,
        references: {
          model: 'Roles',
        }
      },
      createdAt: {
        allowNull: false,
        type: DataType.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataType.DATE
      }
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Role, {
      foreignKey: 'roleId'
    });
  }

  encodeToken() {
    return jwt.sign({
      authToken: this.authToken,
      exp: moment().add(120, 'days').unix(),
    }, process.env.JWT_SECRET)
  }

  static generateAuthToken() {
    return randToken.generate(AUTH_TOKEN_SIZE);
  }

  generateAccessToken() {
    const payload = {authToken: this.authToken}
    const options = {expiresIn: '1d'}
    return jwt.sign(payload, process.env.JWT_SECRET, options)
  }

  static decodeToken(token) {
    try {
      const payload = jwt.decode(token, process.env.JWT_SECRET);
      const now = moment().unix();
      return now > payload.exp ? new Error('Token expired') : payload.authToken;
    } catch (e) {
      return null;
    }
  }

  static async encryptPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT_ROUNDS)
          .then(passwordHas => resolve(passwordHas))
          .catch(error => reject(error));
    })
  }

  static async decryptPassword(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash)
          .then(decryptPassword => resolve(decryptPassword))
          .catch(error => reject(error));
    })
  }

}
