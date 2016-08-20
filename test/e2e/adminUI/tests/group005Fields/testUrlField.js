var fieldTests = require('./commonFieldTestUtils.js');
var UrlModelTestConfig = require('../../../modelTestConfig/urlModel');

module.exports = {
	before: fieldTests.before,
	after: fieldTests.after,
	'Url field should show correctly in the initial modal': function (browser) {
		browser.app.openFieldList('Url');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();

		browser.initialFormScreen.assertUIVisible({
			listModelTestConfig: UrlModelTestConfig,
			fields: ['name', 'fieldA']
		});
	},
	'restoring test state': function(browser) {
		browser.initialFormScreen.cancel();
		browser.app.waitForListScreen();
	},
	'Url field can be filled via the initial modal': function(browser) {
		browser.app.openFieldList('Url');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();
		browser.initialFormScreen.fillInputs({
			listModelTestConfig: UrlModelTestConfig,
			fields: {
				'name': {value: 'Url Field Test 1'},
				'fieldA': {value: 'http://www.example1.com'},
			}
		});
		browser.initialFormScreen.assertInputs({
			listModelTestConfig: UrlModelTestConfig,
			fields: {
				'name': {value: 'Url Field Test 1'},
				'fieldA': {value: 'http://www.example1.com'},
			}
		});
		browser.initialFormScreen.save();
		browser.app.waitForItemScreen();

		browser.itemScreen.assertInputs({
			listModelTestConfig: UrlModelTestConfig,
			fields: {
				'name': {value: 'Url Field Test 1'},
				'fieldA': {value: 'http://www.example1.com'},
			}
		})
	},
	'Url field should show correctly in the edit form': function(browser) {
		browser.itemScreen.assertUIVisible({
			listModelTestConfig: UrlModelTestConfig,
			fields: ['fieldA', 'fieldB']
		});
	},
	'Url field can be filled via the edit form': function(browser) {
		browser.itemScreen.fillInputs({
			listModelTestConfig: UrlModelTestConfig,
			fields: {
				'fieldB': {value: 'http://www.example2.com'}
			}
		});
		browser.itemScreen.save();
		browser.app.waitForItemScreen();
		browser.itemScreen.assertFlashMessage('Your changes have been saved successfully');
		browser.itemScreen.assertInputs({
			listModelTestConfig: UrlModelTestConfig,
			fields: {
				'name': {value: 'Url Field Test 1'},
				'fieldA': {value: 'http://www.example1.com'},
				'fieldB': {value: 'http://www.example2.com'}
			}
		})
	},
};
