var fieldTests = require('../commonFieldTestUtils.js');

module.exports = {
	before: fieldTests.before,
	after: fieldTests.after,
	'Date field should be visible in initial modal': fieldTests.assertInitialFormUI({
		listName: 'Date',
		fields: ['name', 'fieldA']
	}),
	'restoring test state': fieldTests.restore,
};
