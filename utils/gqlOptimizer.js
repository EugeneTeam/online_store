const {checkExistingResource} = require('./utilsForGql');
const {ApolloError} = require('apollo-server');

class GqlOptimizer {
    constructor(tableName, models) {
        if (!tableName) {
            throw new Error('TableName is required');
        }
        if (!models) {
            throw new Error('Models is required');
        }
        this.tableName = tableName;
        this.models = models;
    }

    checkRequiredFields(args, fields) {
        fields.forEach(field => {
            if (args[field] === undefined) {
                throw new ApolloError(`${field} is required`, '400');
            }
        })
        return args;
    }

    /**
     * @param {array} dataArray
     * @param {object} dataArray.where - условие поиска
     * @param {string} dataArray.errorMessage - сообщение ошибки вместо стандартному сообщению
     * @param {boolean} dataArray.failureIfExists - true если ресурс найден то будет выведена ошибка
     * @returns {Promise<void>}
     */
    async checkDependencies(dataArray = []) {
        if (dataArray.length) {
            for (const data of dataArray) {
                const _tableName = data.linkedTableName ? data.linkedTableName : this.tableName;
                const result = await this.models[_tableName].findOne({
                    where: {
                        ...data.where
                    }
                });
                checkExistingResource(result, data.failureIfExists, data.errorMessage);
            }
        }
    }

    async createItem(item, dependencies, tableName = null) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.checkDependencies(dependencies);
                console.log(item)
                resolve(await this
                    .models[tableName ? tableName : this.tableName]
                    .create(item));
            } catch (error) {
                reject(error);
            }
        })

    }
}


module.exports = {
    GqlOptimizer
}
