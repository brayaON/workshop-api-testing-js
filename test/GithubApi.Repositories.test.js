const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const md5 = require('md5');

const { expect } = chai;

chai.use(chaiSubset);

describe('Consume GET methods', () => {
  it('Via Github API', async () => {
    const response = await agent.get('https://api.github.com/users/aperdomob')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    const name = 'Alejandro Perdomo';
    const company = 'PSL';
    const location = 'Colombia';

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.name).equal(name);
    expect(response.body.company).equal(company);
    expect(response.body.location).equal(location);
  });

  it('Accessing The Repo Via Hypermedia', async () => {
    const response = await agent.get('https://api.github.com/users/aperdomob')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    const name = 'jasmine-awesome-report';
    const fullName = 'aperdomob/jasmine-awesome-report';
    const privateVisibility = false;
    const description = 'An awesome html report for Jasmine';
    const checksumRepo = '64FFB5A544DB9D6D7343983D52AF33CC';

    // Find Repo
    expect(response.status).to.equal(statusCode.OK);
    const reposUrl = response.body.repos_url;

    const reposResponse = await agent.get(`${reposUrl}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(reposResponse.status).to.equal(statusCode.OK);

    const repoFound = reposResponse.body.find((element) => element.name === name);

    // Download repo
    expect(repoFound.full_name).equal(fullName);
    expect(repoFound.private).equal(privateVisibility);
    expect(repoFound.description).equal(description);

    const repoDownloadResponse = await agent.get(`${repoFound.svn_url}/archive/${repoFound.default_branch}.zip`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(md5(repoDownloadResponse.body).toUpperCase()).equal(checksumRepo);

    // README
    const checksumReadme = '97EE7616A991AA6535F24053957596B1';

    const contentResponse = await agent.get(`${repoFound.url}/contents/`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(contentResponse.status).to.equal(statusCode.OK);
    const readmeData = contentResponse.body.find((element) => element.name === 'README.md');

    expect(readmeData).containSubset({
      name: 'README.md',
      path: 'README.md',
      sha: '1eb7c4c6f8746fcb3d8767eca780d4f6c393c484'
    });

    const downloadReadmeUrl = readmeData.download_url;

    const downloadReadmeResponse = await agent.get(`${downloadReadmeUrl}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .buffer(true);
    expect(md5(downloadReadmeResponse.text).toUpperCase()).equal(checksumReadme);
  });
});
