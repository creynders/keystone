var fieldTests = require('./commonFieldTestUtils.js');
var SelectModelTestConfig = require('../../../modelTestConfig/selectModel');

module.exports = {
	before: fieldTests.before,
	after: fieldTests.after,
	'Select field should show correctly in the initial modal': function (browser) {
		browser.app.openFieldList('Select');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();

		browser.initialFormScreen.assertUIVisible({
			modelTestConfig: SelectModelTestConfig,
			fields: [
				{name: 'name'},
				{
					name: 'fieldA',
					options: {'editForm': false}
				}
			],
		});
	},
	'restoring test state': function(browser) {
		browser.initialFormScreen.cancel();
		browser.app.waitForListScreen();
	},
	'Select field can be filled via the initial modal': function(browser) {
		browser.app.openFieldList('Select');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();
		browser.initialFormScreen.fillInputs({
			modelTestConfig: SelectModelTestConfig,
			fields: {
				'name': {value: 'Select Field Test 1'},
				'fieldA': {value: 'One'},
			}
		});
		browser.initialFormScreen.assertInputs({
			modelTestConfig: SelectModelTestConfig,
			fields: {
				'name': {value: 'Select Field Test 1'},
				'fieldA': {value: 'One'},
			}
		});
		browser.initialFormScreen.save();
		browser.app.waitForItemScreen();

		browser.itemScreen.assertInputs({
			modelTestConfig: SelectModelTestConfig,
			fields: {
				'name': {value: 'Select Field Test 1'},
				'fieldA': {value: 'One'},
			}
		})
	},
	'Select field should show correctly in the edit form': function(browser) {
		browser.itemScreen.assertUIVisible({
			modelTestConfig: SelectModelTestConfig,
			fields: [
				{
					name: 'fieldA',
					options: {'editForm': true}
				},
				{
					name: 'fieldB',
					options: {'editForm': true}
				}
			],
		});
	},
	'Select field can be filled via the edit form': function(browser) {
		browser.itemScreen.fillInputs({
			modelTestConfig: SelectModelTestConfig,
			fields: {
				'fieldB': {value: 'Two'}
			}
		});
		browser.itemScreen.save();
		browser.app.waitForItemScreen();
		browser.itemScreen.assertFlashMessage('Your changes have been saved successfully');
		browser.itemScreen.assertInputs({
			modelTestConfig: SelectModelTestConfig,
			fields: {
				'name': {value: 'Select Field Test 1'},
				'fieldA': {value: 'One'},
				'fieldB': {value: 'Two'}
			}
		})
	},
};
