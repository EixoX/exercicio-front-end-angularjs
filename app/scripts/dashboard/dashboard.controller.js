(function() {
	'use strict';

	angular.module('dashboardApp').controller('DashboardController', ['$scope','DashboardFactory', function($scope, DashboardFactory) {

		var results = DashboardFactory.query(function() {
			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				if (result.name === 'Mantidas') {
					$scope.mantidas = {};
					$scope.mantidas.total = valuesTotal(result.count);
					$scope.mantidas.periodChart = valuesPieChart("Por período", result.periods);
					$scope.mantidas.typeChart = valuesPieChart("Por tipo", result.types);
					$scope.mantidas.perTypeChart = valuesStackedBarChart("Tipo/Período", result.types);
				} else if (result.name === 'Conquistadas') {
					$scope.conquistadas = {};
					$scope.conquistadas.total = valuesTotal(result.count);
					$scope.conquistadas.periodChart = valuesPieChart("Por período", result.periods);
					$scope.conquistadas.typeChart = valuesPieChart("Por tipo", result.types);
					$scope.conquistadas.perTypeChart = valuesStackedBarChart("Tipo/Período", result.types);
				} else if (result.name === 'Perdidas') {
					$scope.perdidas = {};
					$scope.perdidas.total = valuesTotal(result.count);
					$scope.perdidas.periodChart = valuesPieChart("Por período", result.periods);
					$scope.perdidas.typeChart = valuesPieChart("Por tipo", result.types);
					$scope.perdidas.perTypeChart = valuesStackedBarChart("Tipo/Período", result.types);
				} else if (result.name === 'Pendentes') {
					$scope.pendentes = {};
					$scope.pendentes.total = valuesTotal(result.count);
				}
			}
		});

		function valuesTotal(value) {
			return {
				name: "Total",
				total: value
			};
		}

		function valuesPieChart(name, info) {
			var i;

			var data = [];
			for (i = 0; i < info.length; i++) {
				data.push({
					key: info[i].name,
					value: info[i].count
				});
			}

			var options = {
				chart: {
					type: 'pieChart',
					height: 400,
					x: function(d) {
						return d.key;
					},
					y: function(d) {
						return d.value;
					},
					showLabels: false,
					transitionDuration: 500,
					valueFormat: function(d) {
						return d + " words";
					}
				}
			};

			return {
				name: name,
				data: data,
				options: options
			};
		}

		function valuesStackedBarChart(name, types) {
			var data = [];
			var i;
			for (i = 0; i < types.length; i++) {
				var typeName = types[i].name;
				var periods = types[i].periodsType;
				var values = [];
				for (var j = 0; j < periods.length; j++) {
					var label;
					var value = periods[j].count;
					if (periods[j].name === "Glambox Mensal") {
						label = "M";
					} else if (periods[j].name === "Glambox Anual") {
						label = "A";
					} else if (periods[j].name === "Glambox Semestral") {
						label = "S";
					} else {
						label = "O";
					}
					values.push({
						label: label,
						value: value
					});
				}
				var obj = {
					key: typeName,
					values: values
				};
				data.push(obj);
			}

			var options = {
				chart: {
					type: 'multiBarHorizontalChart',
					height: 400,
					x: function(d) {
						return d.label;
					},
					y: function(d) {
						return d.value;
					},
					showControls: false,
					showValues: true,
					duration: 500,
					xAxis: {
						showMaxMin: true
					},
					yAxis: {
						showMaxMin: true,
						tickFormat: function(d) {
							return d3.format(',.2f')(d);
						}
					}
				}
			};

			return {
				name: name,
				data: data,
				options: options
			};
		}
	}]);
})();