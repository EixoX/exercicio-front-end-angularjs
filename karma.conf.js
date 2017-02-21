//jshint strict: false
module.exports = function(config) {
	config.set({
		preprocessors: {
			'templates/dashboard/*.html': ['ng-html2js']
		},

		ngHtml2JsPreprocessor: {
			stripPrefix: "/",
			moduleName: "templates"
		},

		basePath: './app',

		files: [
			'bower_components/bootstrap/dist/css/bootstrap.css',
			'bower_components/jquery/dist/jquery.js',
			'bower_components/bootstrap/dist/js/bootstrap.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/angular-resource/angular-resource.js',
			'bower_components/d3/d3.min.js',
			'bower_components/nvd3/build/nv.d3.min.js',
			'bower_components/angular-nvd3/dist/angular-nvd3.min.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'**/*.html',
			'**/*.module.js',
			'*!(.module|.spec).js',
			'!(bower_components)/**/*!(.module|.spec).js',
			'**/*.spec.js'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['Chrome', 'Firefox'],

		plugins: [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-jasmine',
			'karma-ng-html2js-preprocessor'
		]
	});
};