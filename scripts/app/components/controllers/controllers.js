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

	//teste de gráficos
	$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	    $scope.series = ['Series A', 'Series B'];

	    $scope.data = [
	      [65, 59, 80, 81, 56, 55, 40],
	      [28, 48, 40, 19, 86, 27, 90]
	    ];

}

glamboxApp.controller(controllers);