const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');
const chaiSubset = require('chai-subset');

const { expect } = chai;

chai.use(chaiSubset);

describe('Consume HEAD method', () => {
  it('Redirecting requests', async () => {
    agent.head('https://github.com/aperdomob/redirect-test')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .then((response) => {
        expect(response.status).equals(statusCode.OK);
      })
      .catch((err) => {
        expect(err.status).equals(statusCode.MOVED_PERMANENTLY);
        const newURL = 'https://github.com/aperdomob/new-redirect-test';
        expect(err.response.headers.location).equal(newURL);
        agent.head(newURL)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent')
          .then((getResponse) => {
            expect(getResponse.status).equal(statusCode.OK);
          });
      });
  });
});
