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
