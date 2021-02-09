const agent = require('superagent');
const chai = require('chai');
const statusCode = require('http-status-codes');

const { expect } = chai;

describe('Consumes PUT methods', () => {
  it('to follow a user on github', async () => {
    const followResponse = await agent.put('https://api.github.com/user/following/aperdomob')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');
    expect(followResponse.status).to.equal(statusCode.NO_CONTENT);
    expect(Object.entries(followResponse.body)).to.be.have.lengthOf(0);

    const listResponse = await agent.get('https://api.github.com/user/following')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');
    expect(listResponse.status).to.equal(statusCode.OK);

    const entry = listResponse.body.find((element) => element.login === 'aperdomob');
    expect(entry).not.to.equal(undefined);
  });
});
