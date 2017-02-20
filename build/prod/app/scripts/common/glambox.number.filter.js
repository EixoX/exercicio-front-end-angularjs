(function() {
	'use strict';

	angular.module('glamboxApp').filter('brnumber', function () {
		return function (text) {
			if (text === null || text === undefined) {
				return '-';
			}
			text = text.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
			return text;
		};
	});
})();
