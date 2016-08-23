var fieldTests = require('./commonFieldTestUtils.js');
var GeoPointModelTestConfig = require('../../../modelTestConfig/geoPointModel');

module.exports = {
	before: fieldTests.before,
	after: fieldTests.after,
	'GeoPoint field should show correctly in the initial modal': function (browser) {
		browser.app.openFieldList('GeoPoint');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();

		browser.initialFormScreen.assertUIVisible({
			modelTestConfig: GeoPointModelTestConfig,
			fields: ['name', 'fieldA']
		});
	},
	'restoring test state': function(browser) {
		browser.initialFormScreen.cancel();
		browser.app.waitForListScreen();
	},
	'GeoPoint field can be filled via the initial modal': function(browser) {
		browser.app.openFieldList('GeoPoint');
		browser.listScreen.createFirstItem();
		browser.app.waitForInitialFormScreen();
		browser.initialFormScreen.fillInputs({
			modelTestConfig: GeoPointModelTestConfig,
			fields: {
				'name': {value: 'GeoPoint Field Test 1'},
				'fieldA': {lat: '123', lng: '456'},
			}
		});
		browser.initialFormScreen.assertInputs({
			modelTestConfig: GeoPointModelTestConfig,
			fields: {
				'name': {value: 'GeoPoint Field Test 1'},
				'fieldA': {lat: '123', lng: '456'},
			}
		});
		browser.initialFormScreen.save();
		browser.app.waitForItemScreen();

		browser.itemScreen.assertInputs({
			modelTestConfig: GeoPointModelTestConfig,
			fields: {
				'name': {value: 'GeoPoint Field Test 1'},
				'fieldA': {lat: '123', lng: '456'},
			}
		})
	},
	'GeoPoint field should show correctly in the edit form': function(browser) {
		browser.itemScreen.assertUIVisible({
			modelTestConfig: GeoPointModelTestConfig,
			fields: ['fieldA', 'fieldB']
		});
	},
	'GeoPoint field can be filled via the edit form': function(browser) {
		browser.itemScreen.fillInputs({
			modelTestConfig: GeoPointModelTestConfig,
			fields: {
				'fieldB': {lat: '789', lng: '246'}
			}
		});
		browser.itemScreen.save();
		browser.app.waitForItemScreen();
		browser.itemScreen.assertFlashMessage('Your changes have been saved successfully');
		browser.itemScreen.assertInputs({
			modelTestConfig: GeoPointModelTestConfig,
			fields: {
				'name': {value: 'GeoPoint Field Test 1'},
				'fieldA': {lat: '123', lng: '456'},
				'fieldB': {lat: '789', lng: '246'}
			}
		})
	},
};
