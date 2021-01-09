'use strict';
require('dotenv').config();
const {Model} = require('sequelize');
const {SALT_ROUNDS, AUTH_TOKEN_SIZE} = require('../config/constans');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
const moment = require('moment');

module.exports = class User extends Model {
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
        validate: {
          isAlpha: true
        }
      },
      lastName: {
        allowNull: false,
        type: DataType.STRING,
        validate: {
          isAlpha: true
        }
      },
      phone: {
        allowNull: false,
        type: DataType.STRING,
        validate: {
          is: /^[0-9]{10,12}$/g
        },
        unique: true
      },
      email: {
        allowNull: false,
        type: DataType.STRING,
        validate: {
          isEmail: true
        },
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
        type: DataType.INTEGER
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
    // define association here
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

  generateAccessToken(authToken) {
    const payload = {
      authToken,
    }
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
