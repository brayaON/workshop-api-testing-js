const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('First API Tests', () => {
  describe('Get without args', () => {
    it('Consume GET Service', async () => {
      const response = await agent.get('https://httpbin.org/ip');

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body).to.have.property('origin');
    });
  });

  describe('Get with args', () => {
    it('Consume GET Service with query parameters', async () => {
      const query = {
        name: 'John',
        age: '31',
        city: 'New York'
      };

      const response = await agent.get('https://httpbin.org/get').query(query);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.args).to.eql(query);
    });
  });

  describe('HEAD method', () => {
    it('Consume HEAD Service', async () => {
      const query = {
        name: 'John',
        age: '31',
        city: 'New York'
      };

      const response = await agent.head('https://httpbin.org/response-headers').query(query);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.headers).to.have.property('name');
      expect(response.headers).to.have.property('age');
      expect(response.headers).to.have.property('city');
    });
  });

  describe('PATCH method', () => {
    it('Consume PATCH Service', async () => {
      const query = {
        name: 'John',
        age: '31',
        city: 'New York'
      };

      const response = await agent.patch('https://httpbin.org/patch').send(query);
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.json).to.eql(query);
    });
  });

  describe('PUT method', () => {
    it('Consume PUT Service', async () => {
      const query = {
        name: 'John',
        age: '31',
        city: 'New York'
      };

      const response = await agent.put('https://httpbin.org/put').send(query);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.json).to.eql(query);
    });
  });

  describe('DELETE method', () => {
    it('Consume DELETE Service', async () => {
      const query = {
        name: 'John',
        age: '31',
        city: 'New York'
      };

      const response = await agent.delete('https://httpbin.org/delete').send(query);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.json).to.eql(query);
    });
  });
});
