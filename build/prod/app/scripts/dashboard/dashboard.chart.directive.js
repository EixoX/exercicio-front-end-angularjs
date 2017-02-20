(function() {
	'use strict';

	angular.module('dashboardApp').directive('appChart', function () {
		return {
			restrict: 'E',
			scope: {
				info: '='
			},
			templateUrl: 'templates/dashboard/chart.html'
		};
	});
})();