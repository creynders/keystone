var fieldTests = require('./commonFieldTestUtils.js');
var TextArrayModelTestConfig = require('../../../modelTestConfig/textArrayModel');

module.exports = {
	before: fieldTests.before,
	after: fieldTests.after,
	'TextArray field should show correctly in the initial modal': function (browser) {
		browser.app.openFieldList('TextArray');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();

		browser.initialFormScreen.assertUIVisible({
			modelTestConfig: TextArrayModelTestConfig,
			fields: [{name: 'name'}]
		});
	},
	'restoring test state': function(browser) {
		browser.initialFormScreen.cancel();
		browser.app.waitForListScreen();
	},
	'TextArray field can be filled via the initial modal': function(browser) {
		browser.app.openFieldList('TextArray');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();
		browser.initialFormScreen.fillInputs({
			modelTestConfig: TextArrayModelTestConfig,
			fields: {
				'name': {value: 'TextArray Field Test 1'},
			}
		});
		browser.initialFormScreen.assertInputs({
			modelTestConfig: TextArrayModelTestConfig,
			fields: {
				'name': {value: 'TextArray Field Test 1'},
			}
		});
		browser.initialFormScreen.save();
		browser.app.waitForItemScreen();
		browser.itemScreen.assertInputs({
			modelTestConfig: TextArrayModelTestConfig,
			fields: {
				'name': {value: 'TextArray Field Test 1'},
			}
		})
	},
	'TextArray field should show correctly in the edit form': function(browser) {
		browser.itemScreen.assertUIVisible({
			modelTestConfig: TextArrayModelTestConfig,
			fields: [{name: 'fieldA'}, {name: 'fieldB'}]
		});
		browser.itemScreen.clickUI({
			modelTestConfig: TextArrayModelTestConfig,
			fields: {
				'fieldA': {'button': 'addButton'},
			}
		});
		browser.itemScreen.assertUIVisible({
			modelTestConfig: TextArrayModelTestConfig,
			fields: [{
				name: 'fieldA',
				options: {'textInputs': ['text1']}
			}],
		});
		browser.itemScreen.clickUI({
			modelTestConfig: TextArrayModelTestConfig,
			fields: {
				'fieldA': {'button': 'addButton'},
			}
		});
		browser.itemScreen.assertUIVisible({
			modelTestConfig: TextArrayModelTestConfig,
			fields: [{
				name: 'fieldA',
				options: {'textInputs': ['text1', 'text2']}
			}],
		});
		browser.itemScreen.clickUI({
			modelTestConfig: TextArrayModelTestConfig,
			fields: {
				'fieldB': {'button': 'addButton'},
			}
		});
		browser.itemScreen.clickUI({
			modelTestConfig: TextArrayModelTestConfig,
			fields: {
				'fieldB': {'button': 'addButton'},
			}
		});
		browser.itemScreen.assertUIVisible({
			modelTestConfig: TextArrayModelTestConfig,
			fields: [{
				name: 'fieldB',
				options:{'textInputs': ['text1', 'text2']}
			}],
		});
	},
	'TextArray field can be filled via the edit form': function(browser) {
		browser.itemScreen.fillInputs({
			modelTestConfig: TextArrayModelTestConfig,
			fields: {
				'fieldA': {text1: 'Test text 1', text2: 'Test text 2'}
			}
		});
		browser.itemScreen.fillInputs({
			modelTestConfig: TextArrayModelTestConfig,
			fields: {
				'fieldB': {text1: 'Test text 3', text2: 'Test text 4'}
			}
		});
		browser.itemScreen.save();
		browser.app.waitForItemScreen();
		browser.itemScreen.assertFlashMessage('Your changes have been saved successfully');
		browser.itemScreen.assertInputs({
			modelTestConfig: TextArrayModelTestConfig,
			fields: {
				'name': {value: 'TextArray Field Test 1'},
				'fieldA': {text1: 'Test text 1', text2: 'Test text 2'},
				'fieldB': {text1: 'Test text 3', text2: 'Test text 4'},
			}
		})
	},
};
