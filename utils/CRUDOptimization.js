const {ApolloError} = require('apollo-server');
const {Model} = require('sequelize');

class CRUDOptimisation extends Model {
    static init(attributes, options) {
        this.models = options.sequelize.models;
        return super.init(attributes, options)
    }

    static returnMethodByValueType(value, allInsteadOfOne, count) {
        if (typeof value === 'object') {
            if (count) {
                return 'findAndCountAll'
            }
            if (allInsteadOfOne) {
                return 'findAll'
            }
            return 'findOne';
        }
        if (typeof value === 'number' || typeof value === 'string') {
            return 'findByPk';
        }
        throw new ApolloError('Wrong value type', '400');
    }

    static async smartSearch({options, returnErrorIfItemNotFound = true, returnsItemsList= false, returnsCountAndList = false, customErrorMessage = ''}) {
        const item = await this[this.returnMethodByValueType(options, returnsItemsList, returnsCountAndList)](options);

        if (returnErrorIfItemNotFound && !item) {
            throw new ApolloError(customErrorMessage ? customErrorMessage : `${this.name} not found`)
        }
        return item;
    }

    static fieldsValidation(item) {
        const fields = Object.keys(this.rawAttributes);
        if (fields.length) {
            fields.forEach(field => {
                if (field !== 'id' &&
                    this.rawAttributes[field].allowNull === false &&
                    !this.rawAttributes[field].defaultValue) {
                    if (!item[field]) {
                        throw new ApolloError(`${field} is required`, '400')
                    }
                }
            })
        }
    }

    static async createItem({item, dependency = [], transaction = null}) {
        if (dependency.length) {
            await this.checkDependencies(dependency);
        }
        this.fieldsValidation(item);
        return this.create(item, {
            ...(transaction ? {transaction} : null)
        });
    }

    static async checkDependencies(dependency) {

        if (!Array.isArray(dependency)) {
            throw new Error('invalid type for dependencies');
        }

        return new Promise(async (resolve, reject) => {
            try {
                const result = [];
                if (dependency.length) {
                    for (const {options, tableName, errorIfElementExists, errorIfElementDoesNotExist, customErrorMessage} of dependency) {
                        const item = await (tableName ? this.models[tableName] : this).smartSearch({options, returnErrorIfItemNotFound: false});
                        if (errorIfElementExists === true && item) {
                            reject(new ApolloError(customErrorMessage ? customErrorMessage : `${tableName || this.name} is exists`, '400'));
                        }

                        if (errorIfElementDoesNotExist === true && !item) {
                            reject(new ApolloError(customErrorMessage ? customErrorMessage : `${tableName || this.name} not found`, '404'));
                        }
                        result.push({
                            options,
                            item
                        });
                    }
                }
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    static async updateItem({updatedItem, options, dependency = [], tableName = '', transaction = null}) {
        if (!options) {
            throw new Error('options is required');
        }
        if (!updatedItem) {
            throw new Error('updatedItem is required');
        }
        if (dependency.length) {
            await this.checkDependencies(dependency);
        }
        const item = await this.models[tableName ? tableName : this.name].smartSearch({
            options,
            errorIfNotExists: true
        });
        return item.update(updatedItem, {
            ...(transaction ? {transaction} : null)
        })
    }

    static async removeItem({options, transaction = null}) {
        const item = await this.smartSearch({
            options,
            errorIfNotExists: true
        });
        if (!item) {
            throw new ApolloError(`${this.name} not found`, '404');
        }
        await item.destroy({...(transaction ? {transaction} : null)});
        return 'success';
    }
}


module.exports = {
    CRUDOptimisation
}
