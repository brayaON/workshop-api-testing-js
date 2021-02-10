const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');
const chaiSubset = require('chai-subset');

const { expect } = chai;

chai.use(chaiSubset);

describe('Consume DELETE methods', () => {
  const params = {
    files: {
      'example.txt': { content: 'This is an example fron an API' }
    },
    public: true,
    description: 'testing from js'
  };
  it('Create a gist and then delete it', () => {
    agent.post('https://api.github.com/gists')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .send(params)
      .then((response) => {
        expect(response.status).equals(statusCode.CREATED);
        expect(response.body).containSubset({
          description: params.description,
          public: params.public
        });
        expect(response.body.files['example.txt']).containSubset({
          filename: 'example.txt',
          content: params.files['example.txt'].content
        });

        const URL = response.body.url;
        agent.get(URL)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent')
          .then((checkURL) => {
            expect(checkURL.status).equal(statusCode.OK);
          });

        const gistID = response.body.id;
        agent.delete(`https://api.github.com/gists/${gistID}`)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent')
          .then((deleteResponse) => {
            expect(deleteResponse.status).equal(statusCode.NO_CONTENT);

            agent.get(URL)
              .auth('token', process.env.ACCESS_TOKEN)
              .set('User-Agent', 'agent')
              .then((checkURL) => {
                expect(checkURL.status).equal(statusCode.NOT_FOUND);
              });
          });
      });
  });
});
