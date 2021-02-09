const agent = require('superagent');
const chai = require('chai');
const statusCode = require('http-status-codes');

const { expect } = chai;

describe('Consumes POST & PATCH methods', () => {
  it('to create an issue on github', async () => {
    const response = await agent.get('https://api.github.com/user')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');
    expect(response.status).equal(statusCode.OK);
    expect(response.body.public_repos).to.be.above(0);

    const reposURL = response.body.repos_url;
    const reposResponse = await agent.get(reposURL)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');
    expect(reposResponse.status).equal(statusCode.OK);

    const validRepo = reposResponse.body.find(
      (element) => element.private === false && element.has_issues === true
    );
    expect(validRepo).not.to.equal(undefined);

    const fullName = validRepo.full_name;
    const title = 'issues from an api';
    const content = 'this is a real issue form an api';

    const issueResponse = await agent.post(`https://api.github.com/repos/${fullName}/issues`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .send({ title });
    expect(issueResponse.status).equal(statusCode.CREATED);
    expect(issueResponse.body.title).equal(title);
    expect(issueResponse.body.body).equal(null);

    const numIssue = issueResponse.body.number;
    const issueModifyResponse = await agent.patch(`https://api.github.com/repos/${fullName}/issues/${numIssue}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .send({ body: content });

    expect(issueModifyResponse.status).equal(statusCode.OK);
    expect(issueModifyResponse.body.title).equal(title);
    expect(issueModifyResponse.body.body).equal(content);
  });
});
