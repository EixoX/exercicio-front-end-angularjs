(function() {
	'use strict';

	describe('glamboxApp', function() {
		beforeEach(function() {
			browser.get('index.html');
			element(by.id('item-dashboard')).click();
		});

		it("should count number of panels", function() {
			expect(element.all(by.css('.panel')).count()).toBe(17);
		});

		it("should count number of subpanel-body", function() {
			expect(element.all(by.css('.subpanel-body')).count()).toBe(13);
		});

		it("should count number of totals", function() {
			expect(element.all(by.css('.total')).count()).toBe(4);
		});

		it("should count number of charts", function() {
			expect(element.all(by.css('nvd3')).count()).toBe(9);
		});

		it("should remove all panels", function() {
			var i;
			var panels = element.all(by.css(".panel"));
			var panNum = panels.count();

			for (i = 0; i < panNum - 1; i++) {
				expect(panels.get(i).isDisplayed().toBe(true));
			}

			var remove = element.all(by.css(".glyphicon-remove"));
			var removeNum = remove.count();
			for (i = 0; i < removeNum - 1; i++) {
				remove.get(i).isDisplayed().then(function(result) {
					if (result) {
						remove.get(i).click();
					}
				});
			}

			for (i = 0; i < panNum - 1; i++) {
				expect(panels.get(i).isDisplayed().toBe(false));
			}
		});

		it("should hide and show all panels", function() {
			var i;
			var panels = element.all(by.css(".panel-body"));
			var panNum = panels.count();

			for (i = 0; i < panNum - 1; i++) {
				expect(panels.get(i).isDisplayed().toBe(true));
			}
			var hide = element.all(by.css(".glyphicon-chevron-up"));
			var hideNum = hide.count();
			for (i = 0; i < hideNum - 1; i++) {
				hide.get(i).isDisplayed().then(function(result) {
					if (result) {
						hide.get(i).click();
					}
				});
			}

			for (i = 0; i < panNum - 1; i++) {
				expect(panels.get(i).isDisplayed().toBe(false));
			}

			var show = element.all(by.css(".glyphicon-chevron-down"));
			var showNum = show.count();
			for (i = 0; i < showNum - 1; i++) {
				show.get(i).isDisplayed().then(function(result) {
					if (result) {
						show.get(i).click();
					}
				});
			}

			for (i = 0; i < panNum - 1; i++) {
				expect(panels.get(i).isDisplayed().toBe(true));
			}
		});
	});
})();