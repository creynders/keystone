module.exports = {
  before : function (client) {
    client
      .url('http://localhost:3000/keystone')
      .waitForElementVisible('div#signin-view', 3000)
      .setValue('input[name=email]', 'test@test.e2e')
      .setValue('input[name=password]', 'test')
      .click('button[type=submit]')
      .pause(1000);
  },
  after : function (client) {
    client
      .click('div#home-view > div > header > nav > div > ul.app-nav.app-nav--primary.app-nav--right > li:nth-child(2) > a')
      .pause(1000)
      .end();
  },
  'AdminUI item should have a working name field' : function (client) {
    client
      .url('http://localhost:3000/keystone')
      .waitForElementVisible('div#home-view', 1000)
      .pause(1000);
      // TODO figure out field testing
  }
};