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
