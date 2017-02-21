(function() {
	'use strict';

	describe("appChart directive test", function() {
		var $compile, $scope, isolScope, data, options;

		beforeEach(module("glamboxApp"));
		beforeEach(module("dashboardApp"));
		beforeEach(module("templates"));

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$scope = _$rootScope_.$new();
		}));


		it('value total being passed', function() {
			$scope.test = {total: 5};
			var element = "<app-chart info='test'></app-chart>";
			element = $compile(element)($scope);
			$scope.$digest();
			expect(element.html()).not.toContain("<nvd3 class='chart' options='info.options' data='info.data'></nvd3>");

			expect(element.html()).toContain("5");

			isolScope = element.isolateScope();
			expect(isolScope.info.total).toBe($scope.test.total);
		});


		it('value total not being passed', function() {
			data = [];
			data.push({key: "key 1", value: 2});
			data.push({key: "key 2", value: 3});
			options = {
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
			$scope.test = {name: "teste", data: data, options: options};

			var element = "<app-chart info='test'></app-chart>";
			element = $compile(element)($scope);
			$scope.$digest();
			expect(element.html()).toContain("nv-pie");

			isolScope = element.isolateScope();
			expect(isolScope.info.name).toBe($scope.test.name);
			expect(isolScope.info.data).toBe(data);
			expect(isolScope.info.options).toBe(options);
		});	
	});
})();