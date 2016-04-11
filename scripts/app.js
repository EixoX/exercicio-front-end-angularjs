(function () {
    'use strict';
    
    angular
    .module('dashAngular',
            ['chart.js']
    )
    .factory('Services', function ($http) {
        
        var subscribers = {};
        
        subscribers.getData = function () {
            return $http.get('data/example-data.js');
        }
        
        return subscribers;
        
    })
    .controller('NewSubsCtrl', function ($scope, Services) {
        
        $scope.titulo = "";
        $scope.labels = [];
        $scope.data = [];
        $scope.total = "";
        var geral = {};
        
        Services.getData()
            .success(function (response) {
                if(response.resultType === 'SUCCESS') {
                    
                    angular.forEach(response.result.children, function (value, key) {
                        
                        geral[key] = value;
                        
                    });
                    
                    $scope.titulo = "Assinaturas " + geral[3].group.name;
                    
                    angular.forEach(geral[3].subs, function(value, key) {
                        $scope.labels[key] = value.subscriptionName;
                        $scope.data[key] = value.subscriberCount;
                    })
                    
                    $scope.total = geral[3].subscriberCount;
                    
                } else {
                    console.log('Error');
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        
    })
    .controller('KeptSubsCtrl', function ($scope, Services) {
        
        $scope.titulo = "";
        $scope.labels = [];
        $scope.data = [];
        $scope.total = "";
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
                    
                    $scope.total = geral[2].subscriberCount;
                    

                } else {
                    console.log('Error');
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        
    })
    .controller('PendingSubsCtrl', function ($scope, Services) {
        
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
        
    })
    .controller('GeralSubsCtrl', function ($scope, Services) {
        
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