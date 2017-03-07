'use strict';

var glamboxApp = angular.module('glamboxApp', ['ngRoute', 'chart.js']);

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