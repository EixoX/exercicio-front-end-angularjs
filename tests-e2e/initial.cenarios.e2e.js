(function() {
	'use strict';

	describe('glamboxApp', function() {
		beforeEach(function() {
			browser.get('index.html');
		});

		it("should check link to/and initial page", function() {
			expect(element.all(by.css('h1')).count()).toBe(1);
			expect(element(by.css('h1')).getText()).toEqual('Bem vindo ao dashboard!');

			expect(element.all(by.css('h3')).count()).toBe(1);
			expect(element(by.css('h3')).getText()).toEqual('Sub-tópico 1');
			
			expect(element.all(by.css('h4')).count()).toBe(1);
			expect(element(by.css('h4')).getText()).toEqual('Sobre');
		});
	});
})();