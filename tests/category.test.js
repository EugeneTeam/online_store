require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;
const url = 'http://localhost';
const faker = require('faker');
const request = require('supertest')(url);
const models = require('../models')

describe('Category test', function() {
    beforeEach(() => {
        models.Category.sequelize.bulkInsert('Categories', [
        {name: 'Processors', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Video cards', createdAt: new Date(), updatedAt: new Date()},
        {name: 'SSD Disk', createdAt: new Date(), updatedAt: new Date()},
        {name: 'HDD Disk', createdAt: new Date(), updatedAt: new Date()},
        {name: 'RAM memory', createdAt: new Date(), updatedAt: new Date()}
        ])
    });
    it('getCategoryById should return "Category not found"', function(done) {
        request.post('/graphql')
            .send({ query: 'query {getCategoryById(categoryId: 9999) {id    name    createdAt    updatedAt}}'})
            .expect(200)//TODO может 404?
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.have.own.property('errors');
                const response = res.body.errors
                expect(response).to.satisfies(function(errors) {
                    return errors.length >= 0
                });
                expect(response[0]).to.have.own.property('message');
                expect(response[0].message).to.be.equal('Category not found');
                done();
            });
    });
    it('getCategoryById should return entry', function(done) {
        request.post('/graphql')
            .send({ query: 'query {getCategoryById(categoryId: 3) {id    name    createdAt    updatedAt}}'})
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                const response = res.body.data.getCategoryById;
                ['id', 'name', 'createdAt', 'updatedAt'].forEach(field => {
                    expect(response).to.have.own.property(field);
                    expect(response[field]).to.not.equal(undefined);
                });
                done();
            });
    });
    it('getCategoryList should return category list and count', function(done) {
        request.post('/graphql')
            .send({ query: 'query {getCategoryList{count rows{id name createdAt updatedAt}}}'})
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                const response = res.body.data.getCategoryList;
                ['count', 'rows'].forEach(field => {
                    expect(response).to.have.own.property(field);
                });
                expect(response.count).to.satisfies(function(count) {
                    return count >= 0
                });
                done();
            });
    });
    it('getCategoryList should return error (Not authorized)', function(done) {
        request.post('/graphql')
            .send({ query: `mutation {createCategory(name: "test name") {id name createdAt updatedAt}}`})
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                const response = JSON.parse(res.text);
                expect(response).to.have.own.property('errors');
                expect(response.errors).to.satisfies(function(errors) {
                    return errors.length > 0
                });
                expect(response.errors[0]).to.have.own.property('message');
                expect(response.errors[0].message).to.satisfies(function(errors) {
                    return errors.includes('Not authorized')
                });
                done();
            });
    });
    it('Authorization and createCategory should return new category', function(done) {
        request
            .post('/graphql')
            .send({ query: `query {authorization(email: "some@email.com", password: "${process.env.DEFAULT_PASSWORD}")}`})
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                const response = JSON.parse(res.text);
                request
                    .post('/graphql')
                    .set('authorization', `Bearer ${response.data.authorization}`)
                    .send({ query: `mutation {createCategory(name: "${faker.lorem.word()}") {id name createdAt updatedAt}}`})
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        const response = JSON.parse(res.text);
                        ['id', 'name', 'createdAt', 'updatedAt'].forEach(field => {
                            expect(response.data.createCategory).to.have.own.property(field);
                            expect(response.data.createCategory).to.not.equal(undefined);
                        });
                        done();
                    });
            });
    });
    it('Authorization and createCategory should return error (Category "Processors" is exists)', function(done) {
        request
            .post('/graphql')
            .send({ query: `query {authorization(email: "some@email.com", password: "${process.env.DEFAULT_PASSWORD}")}`})
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                const response = JSON.parse(res.text);
                request
                    .post('/graphql')
                    .set('authorization', `Bearer ${response.data.authorization}`)
                    .send({ query: `mutation {createCategory(name: "Processors") {id name createdAt updatedAt}}`})
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        const response = JSON.parse(res.text);
                        expect(response).to.have.own.property('errors');
                        expect(response.errors).to.satisfies(function(errors) {
                            return errors.length > 0
                        });
                        expect(response.errors[0]).to.have.own.property('message');
                        expect(response.errors[0].message).to.be.equal('Category "Processors" is exists');
                        done();
                    });
            });
    });
    it('Authorization and updateCategory should rename category from "HDD Disk"', function(done) {
        request
            .post('/graphql')
            .send({ query: `query {authorization(email: "some@email.com", password: "${process.env.DEFAULT_PASSWORD}")}`})
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                const response = JSON.parse(res.text);
                const newName = faker.lorem.word();
                request
                    .post('/graphql')
                    .set('authorization', `Bearer ${response.data.authorization}`)
                    .send({ query: `mutation {updateCategory(categoryId: 3, name: "${newName}") {id    name    createdAt    updatedAt}}`})
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        const response = res.body.data.updateCategory;
                        ['id', 'name', 'createdAt', 'updatedAt'].forEach(field => {
                            expect(response).to.have.own.property(field);
                            expect(response[field]).to.not.equal(undefined);
                        });
                        expect(response.name).to.be.equal(newName)
                        done();
                    });
            });
    });
    it('Authorization and deleteCategory should delete one entry', function(done) {
        request
            .post('/graphql')
            .send({ query: `query {authorization(email: "some@email.com", password: "${process.env.DEFAULT_PASSWORD}")}`})
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                const response = JSON.parse(res.text);
                request
                    .post('/graphql')
                    .set('authorization', `Bearer ${response.data.authorization}`)
                    .send({ query: `mutation {removeCategory(categoryId: 3)}`})
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        expect(res.body.data.removeCategory).to.be.equal('success');
                        done();
                    });
            });
    });
    it('Authorization and deleteCategory should return "Category not found"', function(done) {
        request
            .post('/graphql')
            .send({ query: `query {authorization(email: "some@email.com", password: "${process.env.DEFAULT_PASSWORD}")}`})
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                const response = JSON.parse(res.text);
                request
                    .post('/graphql')
                    .set('authorization', `Bearer ${response.data.authorization}`)
                    .send({ query: `mutation {removeCategory(categoryId: 999)}`})
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        const response = JSON.parse(res.text);
                        expect(response).to.have.own.property('errors');
                        expect(response.errors).to.satisfies(function(errors) {
                            return errors.length > 0
                        });
                        expect(response.errors[0]).to.have.own.property('message');
                        expect(response.errors[0].message).to.be.equal('Category not found');
                        done();
                    });
            });
    });
    it('Authorization and deleteCategory should return the number of items removed', function(done) {
        request
            .post('/graphql')
            .send({ query: `query {authorization(email: "some@email.com", password: "${process.env.DEFAULT_PASSWORD}")}`})
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                const response = JSON.parse(res.text);
                request
                    .post('/graphql')
                    .set('authorization', `Bearer ${response.data.authorization}`)
                    .send({ query: `mutation {bulkDeleteCategory(categoryIds: [4, 5, 6])}`})
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        const response = res.body.data.bulkDeleteCategory
                        expect(response).to.satisfies(function(count) {
                            return count >= 0
                        });
                        done();
                    });
            });
    });
});
