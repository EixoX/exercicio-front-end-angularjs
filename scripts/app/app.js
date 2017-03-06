'use strict';

var glamboxApp = angular.module('glamboxApp', ['ngRoute']);

/****** DIRECTIVES *******/

//Fixlayout
glamboxApp.directive('fixlayout', function ($timeout) {
    return function () {
        function init(){
        	$.AdminLTE.layout.fix();
        }
        $timeout(init(), 0);
    }
});
glamboxApp.config(function($routeProvider){
	$routeProvider
		.when('/',
			{
				controller: 'overviewController',
				templateUrl: './scripts/app/components/views/overviewView.html'
			}
		)
		.otherwise({redirectTo: '/'});

});

var controllers = {};

controllers.overviewController = function($scope){
	$scope.mensagem = 'Bem vindo ao Angularjs';
}

glamboxApp.controller(controllers);