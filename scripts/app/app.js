'use strict';

var glamboxApp = angular.module('glamboxApp', ['ngRoute']);

/****** SERVICES *******/

glamboxApp.service('glamboxEditionHttpService', function($http, glamboxEditionFactory){
	this.get = function(){
		return $http({
					method: 'GET',
					url: './data/example-data.js'
				}).then(function(response){
					glamboxEditionFactory.init(response.data);
					return glamboxEditionFactory;
				});
	};
})

glamboxApp.factory('glamboxEditionFactory', function(){
	var glamboxEdition = {
		assinaturas: {
			perdidas: null,
			mantidas: null,
			pendentes: null,
			conquistadas: null
		}
	};

	glamboxEdition.init =function(editionData){
		for(var i = 0; i < editionData.result.children.length; i++){
			if(editionData.result.children[i].group.name === 'Perdidas'){
				glamboxEdition.assinaturas.perdidas = editionData.result.children[i];
			}
			if(editionData.result.children[i].group.name === 'Mantidas'){
				glamboxEdition.assinaturas.mantidas = editionData.result.children[i];
			}
			if(editionData.result.children[i].group.name === 'Pendentes'){
				glamboxEdition.assinaturas.pendentes = editionData.result.children[i];
			}
			if(editionData.result.children[i].group.name === 'Conquistadas'){
				glamboxEdition.assinaturas.conquistadas = editionData.result.children[i];
			}
		}
	}

	return glamboxEdition;
});


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
				templateUrl: './scripts/app/components/views/overviewView.html',
				resolve: {
					GlamboxEditionData: function(glamboxEditionHttpService){
						return glamboxEditionHttpService.get();
					}
				}
			}
		)
		.when('/assinaturas/:tipoAssinatura',
			{
				controller: 'assinaturasDetalheController',
				templateUrl: './scripts/app/components/views/assinaturasDetalheView.html',
				resolve: {
					GlamboxEditionData: function(glamboxEditionHttpService){
						return glamboxEditionHttpService.get();
					}
				}
			}
		)
		.otherwise({redirectTo: '/'});

});

var controllers = {};

controllers.overviewController = function($scope, GlamboxEditionData){
	$scope.pagina = {
		titulo: 'Assinaturas',
		subtitulo: 'Visão geral'
	}

	$scope.glamboxEditionData = GlamboxEditionData;


	console.log(GlamboxEditionData);
}

controllers.assinaturasDetalheController = function($scope, $route, $location, GlamboxEditionData){
	//se o parametro de url 'tipoAssinatura' for inválido, redirecionar para home
	var tipoAssinatura = $route.current.params.tipoAssinatura;
	if(tipoAssinatura != 'perdidas' && tipoAssinatura != 'mantidas' && tipoAssinatura != 'pendentes' && tipoAssinatura != 'conquistadas')
		$location.path('/');

	$scope.pagina = {
		titulo: 'Assinaturas ' + GlamboxEditionData.assinaturas[tipoAssinatura].group.name,
		subtitulo: 'Visão geral'
	}
	console.log(GlamboxEditionData.assinaturas[tipoAssinatura]);
	$scope.glamboxEditionData = GlamboxEditionData.assinaturas[tipoAssinatura];

}

glamboxApp.controller(controllers);