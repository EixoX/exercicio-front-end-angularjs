var controllers = {};

controllers.overviewController = function($scope, GlamboxEditionData){
	$scope.pagina = {
		titulo: 'Assinaturas',
		subtitulo: 'Visão geral'
	}

	$scope.glamboxEditionData = GlamboxEditionData;
}

controllers.assinaturasDetalheController = function($scope, $route, $location, GlamboxEditionData){
	console.log(GlamboxEditionData);
	var tipoAssinatura = $route.current.params.tipoAssinatura;

	//se o parametro de url 'tipoAssinatura' for inválido, redirecionar para home
	redirectIfInvalidURLParam(tipoAssinatura);
	defineBoxType(tipoAssinatura);

	$scope.pagina = {
		titulo: 'Assinaturas ' + GlamboxEditionData.assinaturas[tipoAssinatura].group.name,
		subtitulo: 'Visão geral'
	}

	//Todas as informações da edição retornada pelo json.
	$scope.glamboxEditionDataAll = GlamboxEditionData;
	//informações específicas da página atual
	$scope.glamboxEditionData = GlamboxEditionData.assinaturas[tipoAssinatura];
	definirGraficos($scope.glamboxEditionData);

	
	

	//Funcções
	function definirGraficos(_glamboxEditionData){
		for(var i= 0; i < _glamboxEditionData.children.length; i++){
			_glamboxEditionData.children[i].data = (function(){
					var graficoData = {
						labels: [],
						data: []
					}
					for(var j = 0; j < _glamboxEditionData.children[i].subs.length; j++){
						graficoData.labels.push(_glamboxEditionData.children[i].subs[j].subscriptionName);
						graficoData.data.push(_glamboxEditionData.children[i].subs[j].subscriberCount);
						
					}

					return graficoData;
			})();
		}
	}
	
	function redirectIfInvalidURLParam(_tipoAssinatura){
		if(_tipoAssinatura != 'perdidas' && _tipoAssinatura != 'mantidas' && _tipoAssinatura != 'pendentes' && _tipoAssinatura != 'conquistadas')
			$location.path('/');
	}

	function defineBoxType(_tipoAssinatura){
		switch(_tipoAssinatura) {
		    case 'perdidas':
		        $scope.boxType = 'box-danger';
		        break;
		    case 'mantidas':
		        $scope.boxType = 'box-warning';
		        break;
		    case 'pendentes':
		        $scope.boxType = 'box-info';
		        break;
		    case 'conquistadas':
		        $scope.boxType = 'box-success';
		        break;
		}
	}
}

controllers.graficoHorizontalController = function($scope){
	var glamboxEditionData = $scope.$parent.glamboxEditionData;

    var graficoData = getData();

	$scope.labels = graficoData.labels;
    // $scope.series = ['Series A'];
    $scope.data = [
      graficoData.data
    ];
    $scope.options = {
    	responsiveAnimationDuration: 400
    }


    function getData(){
    	var graficoData = {
    		labels: [],
    		data: []
    	}

    	for(var i = 0; i < glamboxEditionData.subs.length; i++){
    		if(glamboxEditionData.subs[i].subscriptionName != null){
    			graficoData.labels.push(glamboxEditionData.subs[i].subscriptionName);
    			graficoData.data.push(glamboxEditionData.subs[i].subscriberCount);
    		}
    	}

    	return graficoData;
    	
    }
}

glamboxApp.controller(controllers);