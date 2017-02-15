var app = angular.module("dashboard", ['googlechart']);

app.controller("chartsCtrl", function($scope, $http) {

    $http({
        method: 'GET',
        url: 'data/example-data.js'
    }).then(function successCallback(response) {
        $scope.indices = response.data.result.children;
        console.log($scope.indices[3].children[0].subscriberCount);
        $scope.myChartObject = {};

        $scope.myChartObject.type = "PieChart";

        $scope.aPagamento = [
            { v: "Mantidas com Pagamento" },
            { v: $scope.indices[2].children[0].subscriberCount },
        ]

        $scope.aVoucher = [
            { v: "Mantidas com Voucher" },
            { v: $scope.indices[2].children[1].subscriberCount },
        ]

         $scope.aRenovadas = [
            { v: "Renovadas" },
            { v: $scope.indices[2].children[2].subscriberCount },
        ]

        $scope.myChartObject.data = {
            "cols": [
                { id: "t", label: "Topping", type: "string" },
                { id: "s", label: "Slices", type: "number" }
            ],
            "rows": [
                { c: $scope.aPagamento },
                { c: $scope.aVoucher },
                { c: $scope.aRenovadas }
            ]
        };

        $scope.myChartObject.options = {
            'title': 'Assinaturas Mantidas'
        };

        $scope.nConquistada = [
            { v: "Conquistadas" },
            { v: $scope.indices[3].children[0].subscriberCount },
        ]

        $scope.nVoucher = [
            { v: "Com Pagamento" },
            { v: $scope.indices[3].children[1].subscriberCount },
        ]

         $scope.nPagamento = [
            { v: "Com Voucher" },
            { v: $scope.indices[3].children[2].subscriberCount },
        ]

        $scope.aNovas = {};

        $scope.aNovas.type = "PieChart";

        $scope.aNovas.data = {
            "cols": [
                { id: "t", label: "Topping", type: "string" },
                { id: "s", label: "Slices", type: "number" }
            ],
            "rows": [
                { c: $scope.nConquistada },
                { c: $scope.nVoucher },
                { c: $scope.nPagamento }
            ]
        };

        $scope.aNovas.options = {
            'title': 'Assinaturas Novas'
        };

    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });



});
