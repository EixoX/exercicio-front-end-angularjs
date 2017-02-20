(function() {
	'use strict';

	angular.module('dashboardApp').factory('DashboardFactory', ['$resource', function ($resource){
		return $resource("data/example-data.json",{},{
			query: {method: 'GET', isArray: true, transformResponse: function(data){
					var i, j, k;
					var dataJson = angular.fromJson(data).result.children;
					var items = [];
					for (i = 0; i < dataJson.length; i++) {
						var subsJson = dataJson[i].subs;
						var periods = [];
						for (j = 0; j < subsJson.length; j++) {
							var period = {
								name: subsJson[j].subscriptionName,
								count: subsJson[j].subscriberCount
							};
							periods.push(period);
						}

						var childrenJson = dataJson[i].children;
						var types = [];
						for (j = 0; j < childrenJson.length; j++) {
							var periodsType = [];
							for (k = 0; k < childrenJson[j].subs.length; k++) {
								var periodType = {
									name: childrenJson[j].subs[k].subscriptionName,
									count: childrenJson[j].subs[k].subscriberCount
								};
								periodsType.push(periodType);
							}
							var type = {
								name: childrenJson[j].group.name,
								count: childrenJson[j].subscriberCount,
								periodsType: periodsType
							};
							types.push(type);
						}

						var item = {
							name: dataJson[i].group.name,
							count: dataJson[i].subscriberCount,
							periods: periods,
							types: types
						};
						items.push(item);
					}
					return items;
				}
			}
		});
	}]);
})();
