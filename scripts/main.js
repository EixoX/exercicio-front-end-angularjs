//CRIANDO MODULO PRINCIPAL
angular.module('main', ['ngRoute', 'chart.js'])

//CONFIGURANDO ROTAS
.config(function($routeProvider) {
	//DASHBOARD
	$routeProvider.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'DashboardController'
	});

	//ROTA DEFAULT
	$routeProvider.otherwise({ redirectTo: '/dashboard'});
});