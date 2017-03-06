'use strict';

var glamboxApp = angular.module('glamboxApp', ['ngRoute']);

/****** DIRECTIVES *******/

//Fixlayout
glamboxApp.directive('fixlayout', function ($timeout) {
    return function () {
        function init(){
        	$.AdminLTE.layout.fix();
        }
        $timeout(init(), 0);
    }
});