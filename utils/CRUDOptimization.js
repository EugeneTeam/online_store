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

    /**
     * Поиск одного или множественное количество item
     * @param {object|string|number} options
     * {object} options - должне содержать where для поиска
     * {string|number} - поиск по первичному ключу методом findByPk
     * @param {boolean} error - при true вернет ошибку если item не будет найден
     * @param {boolean} useFindAll - использует метод findAll и возвращает массив items
     * @param {boolean} count - при true используется метод findAndCountAll (необходимо для пагинации)
     * @param {string} message - при error: true будет возвращать пользовательский текст ошибки
     * @returns {Promise<*>}
     */
    static async findItem({options, error = false, useFindAll= false, count = false, message = ''}) {
        const item = await this[this.returnMethodByValueType(options, useFindAll, count)](options);

        if (error && !item) {
            throw new ApolloError(message ? message : `${this.name} not found`)
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

    /**
     * Создание нового экземпляра item
     * @param {object} item - структура объекта зависит от используемой модели
     * @param {array} dependency - проверка зависимостей
     * @param {object|string|number} dependency.options
     * @param {string} dependency.table
     * @param {boolean} dependency.error
     * @param {string} dependency.message
     * @param {transaction} transaction - sequelize transaction для обеспечения безопасного создания item в количестве > 1
     * @returns {Promise<item>}
     */
    static async createItem({item, dependency = [], transaction = null}) {
        if (dependency.length) {
            await this.checkDependencies(dependency);
        }
        this.fieldsValidation(item);
        return this.create(item, {
            ...(transaction ? {transaction} : null)
        });
    }

    /**
     *
     * @param {array} dependency - проверка зависимостей
     * @param {object|string|number} dependency.options
     * @param {string} dependency.table
     * @param {boolean} dependency.error
     * @param {string} dependency.message
     * @returns {Promise<unknown>}
     */
    static async checkDependencies(dependency) {

        if (!Array.isArray(dependency)) {
            throw new Error('invalid type for dependencies');
        }

        return new Promise(async (resolve, reject) => {
            try {
                const result = [];
                if (dependency.length) {
                    for (const {options, table, error, message} of dependency) {
                        const item = await this.findItem({options});
                        if (error && item) {
                            reject(new ApolloError(message ? message : `${table || this.name} is exists`, '400'));
                        }

                        if (!error && !item) {
                            reject(new ApolloError(message ? message : `${table || this.name} not found`, '404'));
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

    /**
     *
     * @param {object} updatedItem - структура объекта зависит от используемой модели
     * @param {object} options
     * {object} options - должне содержать where для поиска
     * {string|number} - поиск по первичному ключу методом findByPk
     * @param {array} dependency - проверка зависимостей
     * @param {string} table - имя таблицы в которой будет создана заись(поумолчанию текущая модель)
     * @param {transaction} transaction - sequelize transaction для обеспечения безопасного обновления item в количестве > 1
     * @returns {Promise<*>}
     */
    static async updateItem({updatedItem, options, dependency = [], table = '', transaction = null}) {
        if (!options) {
            throw new Error('options is required');
        }
        if (!updatedItem) {
            throw new Error('updatedItem is required');
        }
        if (dependency.length) {
            await this.checkDependencies(dependency);
        }
        const item = await this.models[table ? table : this.name].findItem({
            options,
            errorIfNotExists: true
        });
        return item.update(updatedItem, {
            ...(transaction ? {transaction} : null)
        })
    }

    /**
     *
     * @param {object} options
     * {object} options - должне содержать where для поиска
     * {string|number} - поиск по первичному ключу методом findByPk
     * @param t{transaction} transaction - sequelize transaction для обеспечения безопасного обновления item в количестве > 1
     * @returns {Promise<string>}
     */
    static async removeItem({options, transaction = null}) {
        const item = await this.findItem({
            options,
            errorIfNotExists: true
        });
        if (!item) {
            throw new ApolloError(`${this.name} not found`, '404');
        }
        await item.destroy({}, {...(transaction ? {transaction} : null)});
        return 'success';
    }
}


module.exports = {
    CRUDOptimisation
}
