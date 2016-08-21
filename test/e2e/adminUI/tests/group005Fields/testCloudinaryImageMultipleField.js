var fieldTests = require('./commonFieldTestUtils.js');
var CloudinaryImageMultipleModelTestConfig = require('../../../modelTestConfig/cloudinaryImageMultipleModel');

module.exports = {
	before: fieldTests.before,
	after: fieldTests.after,
	'CloudinaryImageMultiple field should show correctly in the initial modal': function (browser) {
		browser.app.openFieldList('CloudinaryImageMultiple');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();

		browser.initialFormScreen.assertUIVisible({
			modelTestConfig: CloudinaryImageMultipleModelTestConfig,
			fields: ['name']
		});
	},
	'restoring test state': function(browser) {
		browser.initialFormScreen.cancel();
		browser.app.waitForListScreen();
	},
	'CloudinaryImageMultiple field can be filled via the initial modal': function(browser) {
		browser.app.openFieldList('CloudinaryImageMultiple');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();
		browser.initialFormScreen.fillInputs({
			modelTestConfig: CloudinaryImageMultipleModelTestConfig,
			fields: {
				'name': {value: 'CloudinaryImageMultiple Field Test 1'},
			}
		});
		browser.initialFormScreen.assertInputs({
			modelTestConfig: CloudinaryImageMultipleModelTestConfig,
			fields: {
				'name': {value: 'CloudinaryImageMultiple Field Test 1'},
			}
		});
		browser.initialFormScreen.save();
		browser.app.waitForItemScreen();

		browser.itemScreen.assertInputs({
			modelTestConfig: CloudinaryImageMultipleModelTestConfig,
			fields: {
				'name': {value: 'CloudinaryImageMultiple Field Test 1'},
			}
		})
	},
	'CloudinaryImageMultiple field should show correctly in the edit form': function(browser) {
		browser.itemScreen.assertUIVisible({
			modelTestConfig: CloudinaryImageMultipleModelTestConfig,
			fields: ['fieldA', 'fieldB']
		});
	},
};
