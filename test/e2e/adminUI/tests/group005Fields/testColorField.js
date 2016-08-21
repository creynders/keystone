var fieldTests = require('./commonFieldTestUtils.js');
var ColorModelTestConfig = require('../../../modelTestConfig/colorModel');

module.exports = {
	before: fieldTests.before,
	after: fieldTests.after,
	'Color field should show correctly in the initial modal': function (browser) {
		browser.app.openFieldList('Color');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();

		browser.initialFormScreen.assertUIVisible({
			modelTestConfig: ColorModelTestConfig,
			fields: ['name', 'fieldA']
		});
	},
	'restoring test state': function(browser) {
		browser.initialFormScreen.cancel();
		browser.app.waitForListScreen();
	},
	'Color field can be filled via the initial modal': function(browser) {
		browser.app.openFieldList('Color');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();
		browser.initialFormScreen.fillInputs({
			modelTestConfig: ColorModelTestConfig,
			fields: {
				'name': {value: 'Color Field Test 1'},
				'fieldA': {value: '#002147'},
			}
		});
		browser.initialFormScreen.assertInputs({
			modelTestConfig: ColorModelTestConfig,
			fields: {
				'name': {value: 'Color Field Test 1'},
				'fieldA': {value: '#002147'},
			}
		});
		browser.initialFormScreen.save();
		browser.app.waitForItemScreen();

		browser.itemScreen.assertInputs({
			modelTestConfig: ColorModelTestConfig,
			fields: {
				'name': {value: 'Color Field Test 1'},
				'fieldA': {value: '#002147'},
			}
		})
	},
	'Color field should show correctly in the edit form': function(browser) {
		browser.itemScreen.assertUIVisible({
			modelTestConfig: ColorModelTestConfig,
			fields: ['fieldA', 'fieldB']
		});
	},
	'Color field can be filled via the edit form': function(browser) {
		browser.itemScreen.fillInputs({
			modelTestConfig: ColorModelTestConfig,
			fields: {
				'fieldB': {value: '#f8e71c'}
			}
		});
		browser.itemScreen.save();
		browser.app.waitForItemScreen();
		browser.itemScreen.assertFlashMessage('Your changes have been saved successfully');
		browser.itemScreen.assertInputs({
			modelTestConfig: ColorModelTestConfig,
			fields: {
				'name': {value: 'Color Field Test 1'},
				'fieldA': {value: '#002147'},
				'fieldB': {value: '#f8e71c'}
			}
		})
	},
};
