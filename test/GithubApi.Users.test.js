const agent = require('superagent');
const chai = require('chai');
const statusCode = require('http-status-codes');

const { expect } = chai;

describe('Query parameters', () => {
  it('to list default users', async () => {
    const response = await agent.get('https://api.github.com/users')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');
    expect(response.status).to.equal(statusCode.OK);
    const cntUsers = Object.entries(response.body).length;
    expect(cntUsers).equals(30);
  });

  it('to list 10 users', async () => {
    const total = 10;
    const query = {
      per_page: total
    };

    const response = await agent.get('https://api.github.com/users')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .query(query);
    expect(response.status).to.equal(statusCode.OK);
    const cntUsers = Object.entries(response.body).length;
    expect(cntUsers).equals(total);
  });

  it('to list 50 users', async () => {
    const total = 50;
    const query = {
      per_page: total
    };
    const response = await agent.get('https://api.github.com/users')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .query(query);
    expect(response.status).to.equal(statusCode.OK);
    const cntUsers = Object.entries(response.body).length;
    expect(cntUsers).equals(total);
  });
});
