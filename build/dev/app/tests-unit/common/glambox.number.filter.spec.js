(function() {
	'use strict';

	describe('number filter', function(){
		var $filter;

		beforeEach(module('glamboxApp'));
		
		beforeEach(inject(function(_$filter_){
		    $filter = _$filter_;
		  }));
		
		it("return '-' when giving null", function(){
			var number = $filter('brnumber');
			expect(number(null)).toEqual("-");
		});
		
		it("return ###.###.#### with divison when giving value", function(){
			var number = $filter('brnumber');
			expect(number(1256591)).toEqual("1.256.591");
		});
	});
})();
