(function () {
	'use strict';

	angular.module('glamboxApp').config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/',{
			templateUrl: "templates/common/initial.html"
		});
	} ]);
})();