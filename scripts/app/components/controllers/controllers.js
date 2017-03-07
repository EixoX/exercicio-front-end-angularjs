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