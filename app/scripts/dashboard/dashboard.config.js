(function () {
	'use strict';

	angular.module('dashboardApp').config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/dashboard',{
			templateUrl: "templates/dashboard/view.html"
		});
	} ]);
})();