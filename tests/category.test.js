const chai = require('chai');
const expect = chai.expect;
const url = 'http://localhost';
const faker = require('faker');
const request = require('supertest')(url);

describe('Category test', function() {
    it('getCategoryList should return category list and count', function(done) {
        request.post('/graphql')
            .send({ query: 'query {getCategoryList{count rows {name}}}'})
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                const response = res.body.data.getCategoryList.count;
                expect(res.body.data.getCategoryList).to.have.own.property('count');
                expect(res.body.data.getCategoryList).to.have.own.property('rows');
                expect(response).to.satisfies(function(count) {
                    return count >= 0
                });
                done();
            })
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
            })
    });
});
