var fieldTests = require('./commonFieldTestUtils.js');
var HtmlModelTestConfig = require('../../../modelTestConfig/htmlModel');

module.exports = {
	before: fieldTests.before,
	after: fieldTests.after,
	'Html field should show correctly in the initial modal': function (browser) {
		browser.app.openFieldList('Html');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();

		browser.initialFormScreen.assertUIVisible({
			modelTestConfig: HtmlModelTestConfig,
			fields: ['name', 'fieldA']
		});
	},
	'restoring test state': function(browser) {
		browser.initialFormScreen.cancel();
		browser.app.waitForListScreen();
	},
	'Html field can be filled via the initial modal': function(browser) {
		browser.app.openFieldList('Html');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();
		browser.initialFormScreen.fillInputs({
			modelTestConfig: HtmlModelTestConfig,
			fields: {
				'name': {value: 'Html Field Test 1'},
				'fieldA': {value: 'Some test html code for field A'},
			}
		});
		browser.initialFormScreen.assertInputs({
			modelTestConfig: HtmlModelTestConfig,
			fields: {
				'name': {value: 'Html Field Test 1'},
				'fieldA': {value: 'Some test html code for field A'},
			}
		});
		browser.initialFormScreen.save();
		browser.app.waitForItemScreen();

		browser.itemScreen.assertInputs({
			modelTestConfig: HtmlModelTestConfig,
			fields: {
				'name': {value: 'Html Field Test 1'},
				'fieldA': {value: 'Some test html code for field A'},
			}
		})
	},
	'Html field should show correctly in the edit form': function(browser) {
		browser.itemScreen.assertUIVisible({
			modelTestConfig: HtmlModelTestConfig,
			fields: ['fieldA', 'fieldB']
		});
	},
	'Html field can be filled via the edit form': function(browser) {
		browser.itemScreen.fillInputs({
			modelTestConfig: HtmlModelTestConfig,
			fields: {
				'fieldB': {value: 'Some test html code for field B'}
			}
		});
		browser.itemScreen.save();
		browser.app.waitForItemScreen();
		browser.itemScreen.assertFlashMessage('Your changes have been saved successfully');
		browser.itemScreen.assertInputs({
			modelTestConfig: HtmlModelTestConfig,
			fields: {
				'name': {value: 'Html Field Test 1'},
				'fieldA': {value: 'Some test html code for field A'},
				'fieldB': {value: 'Some test html code for field B'}
			}
		})
	},
};
