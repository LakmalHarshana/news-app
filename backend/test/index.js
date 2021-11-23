'use strict'

// Load modules

const Code = require('@hapi/code')
const Lab = require('@hapi/lab')
const Server = require('../server')
const Package = require('../package.json')

// Test shortcuts

const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script())
const { expect } = Code

describe('Deployment', () => {
  it('registers the main plugin.', async () => {
    const server = await Server.deployment()

    expect(server.registrations[Package.name]).to.exist()
  })
})

describe('GET /', async () => {
  let server = await Server.deployment()

  beforeEach(async () => {
      server = await server.initialize()
  });

  afterEach(async () => {
      await server.stop();
  });

  it('responds with 200', async () => {
      const res = await server.inject({
          method: 'get',
          url: '/'
      });
      expect(res.statusCode).to.equal(200);
  });
});
