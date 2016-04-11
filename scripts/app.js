(function () {
    'use strict';
    
    var app = angular.module('dashAngular', ['chart.js']);
    
    // Call Service with Json
    app.factory('Services', function ($http) {
        
        var subscribers = {};
        
        subscribers.getData = function () {
            return $http.get('data/example-data.js');
        }
        
        return subscribers;
        
    });
    
    
    // Dashboard
    app.controller('NewSubsCtrl', function ($scope, Services) {
        
        $scope.titulo = "";
        $scope.labels = [];
        $scope.data = [];
        var geral = {};
        
        
        Services.getData()
            .success(function (response) {
                if(response.resultType === 'SUCCESS') {
                    
                    angular.forEach(response.result.children, function (value, key) {
                        
                        geral[key] = value;
                        
                        
                        
                    });
                    
                    console.log(geral);
                    
                    $scope.titulo = "Assinaturas " + geral[3].group.name;
                    
                    angular.forEach(geral[3].subs, function(value, key) {
                        $scope.labels[key] = value.subscriptionName;
                        $scope.data[key] = value.subscriberCount;
                    })
                    
                } else {
                    console.log('Error');
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        
    });
    
    app.controller('KeptSubsCtrl', function ($scope, Services) {
        
        $scope.titulo = "";
        $scope.labels = [];
        $scope.data = [];
        var geral = {};
        
        
        Services.getData()
            .success(function (response) {
                if(response.resultType === 'SUCCESS') {
                    
                    angular.forEach(response.result.children, function (value, key) {
                        
                        geral[key] = value;
                        
                    });
                    
                    $scope.titulo = "Assinaturas " + geral[2].group.name;
                    
                    angular.forEach(geral[2].subs, function(value, key) {
                        $scope.labels[key] = value.subscriptionName;
                        $scope.data[key] = value.subscriberCount;
                    })
                    

                } else {
                    console.log('Error');
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        
    });
    
    app.controller('PendingSubsCtrl', function ($scope, Services) {
        
        $scope.titulo = "";
        var geral = {};
        
        Services.getData()
            .success(function (response) {
                if(response.resultType === 'SUCCESS') {
                    
                    angular.forEach(response.result.children, function (value, key) {
                        
                        geral[key] = value;
                        
                    });
                    
                    $scope.titulo = "Assinaturas " + geral[0].group.name;
                    $scope.numeros = geral[0].subscriberCount;
                    

                } else {
                    console.log('Error');
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        
    });
    
    app.controller('GeralSubsCtrl', function ($scope, Services) {
        
        $scope.titulo = "Assinaturas Geral";
        $scope.geral = {}
        
        
        Services.getData()
            .success(function (response) {
                if(response.resultType === 'SUCCESS') {
                    
                    angular.forEach(response.result.children, function (value, key) {
                        
                        $scope.geral[key] = value;
                        
                    });
                    

                } else {
                    console.log('Error');
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        
    });
    
    
    
    
})();