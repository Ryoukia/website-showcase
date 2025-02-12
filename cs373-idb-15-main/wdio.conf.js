const dynamicConfig = {};
if(process.env.CI_JOB_NAME) {
  dynamicConfig.capabilities = [
      { browserName: process.env.CI_JOB_NAME === 'test_selenium_frontend' ? 'chrome' : 'chrome' },
  ];
}

exports.config = Object.assign({}, {
  runner: 'local',
  specs: [
    './src/gui-tests/AppTester.test.js'
  ],
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless', '--disable-gpu', '--no-sandbox']
    }
  }],
  logLevel: 'error',
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 300000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 300000
  }
}, dynamicConfig);