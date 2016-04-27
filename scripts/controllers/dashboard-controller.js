angular.module('main').controller('DashboardController', function($scope, $http){
  $scope.dados = {};
  //ASSINATURAS GERAL
  $scope.assinaturas = [];

  //ASSINATURAS CANCELADAS
  $scope.perdidas_name = [];
  $scope.perdidas_count = [];

  //ASSINATURAS MANTIDAS
  $scope.mantidas_name = [];
  $scope.mantidas_count = [];

  //ASSINATURAS CONQUISTADAS
  $scope.conquistadas_name = [];
  $scope.conquistadas_count = [];


  //ASSINATURAS MANTIDAS POR PLANO MENSAL
  $scope.mantidas_mensal = 0;
  //ASSINATURAS MANTIDAS POR PLANO ANUAL
  $scope.mantidas_anual = 0;
  //ASSINATURAS MANTIDAS POR PLANO SEMESTRAL
  $scope.mantidas_semestral = 0;

  //ASSINATURAS CONQUISTADAS POR PLANO MENSAL
  $scope.conquistadas_mensal = 0;
  //ASSINATURAS CONQUISTADAS POR PLANO ANUAL
  $scope.conquistadas_anual = 0;
  //ASSINATURAS CONQUISTADAS POR PLANO SEMESTRAL
  $scope.conquistadas_semestral = 0;

  

  //RECEBE DADOS DO JSON
  $http.get('./data/example-data.js')
  .success(function(data){
   $scope.dados = data;

   angular.forEach($scope.dados.result.children, function(value, key){
      //RESULTADO GERAL
      $scope.assinaturas[key] = value.children;
      
        angular.forEach(value.children, function(value, key){

          //ASSINATURAS CANCELADAS
          if(value.group.parentId == 2){
            $scope.perdidas_name[key] = value.group.name;
            $scope.perdidas_count[key] = value.subscriberCount;
          }

          //ASSINATURAS MANTIDAS
          if(value.group.parentId == 8){
            $scope.mantidas_name[key] = value.group.name;
            $scope.mantidas_count[key] = value.subscriberCount;

            console.log(value.subs);
              angular.forEach(value.subs, function(value, key){
                 //ASSINATURAS MANTIDAS POR PLANO MENSAL
                 if(value.subscriptionTypeId == 1){
                    $scope.mantidas_mensal += value.subscriberCount;
                 }

                 //ASSINATURAS MANTIDAS POR PLANO ANUAL
                 if(value.subscriptionTypeId == 2){
                    $scope.mantidas_anual += value.subscriberCount;
                 }

                 //ASSINATURAS MANTIDAS POR PLANO SEMESTRAL
                 if(value.subscriptionTypeId == 3){
                    $scope.mantidas_semestral += value.subscriberCount;
                 }

              });
          }

          //ASSINATURAS CONQUISTADAS
          if(value.group.parentId == 9){
            $scope.conquistadas_name[key] = value.group.name;
            $scope.conquistadas_count[key] = value.subscriberCount;

            angular.forEach(value.subs, function(value, key){
                 //ASSINATURAS MANTIDAS POR PLANO MENSAL
                 if(value.subscriptionTypeId == 1){
                    $scope.conquistadas_mensal += value.subscriberCount;
                 }

                 //ASSINATURAS MANTIDAS POR PLANO ANUAL
                 if(value.subscriptionTypeId == 2){
                    $scope.conquistadas_anual += value.subscriberCount;
                 }

                 //ASSINATURAS MANTIDAS POR PLANO SEMESTRAL
                 if(value.subscriptionTypeId == 3){
                    $scope.conquistadas_semestral += value.subscriberCount;
                    console.log(value.subscriberCount);
                    console.log($scope.conquistadas_semestral);
                 }

              });
          }

          //ASSINATURAS COM BASE NO TIPO DE PLANO
          $scope.tipos_periodo = ['Glambox Mensal', 'Glambox Anual', 'Glambox Semestral'];
          $scope.tipos_series = ['Mantidas', 'Conquistadas'];
          $scope.tipos_data = [
              [$scope.mantidas_mensal, $scope.mantidas_anual, $scope.mantidas_semestral],
              [$scope.conquistadas_mensal, $scope.conquistadas_anual, $scope.conquistadas_semestral]
          ]
          $scope.tipos_cores = ['#4D5360', '#46BFBD'];

        });

   });
  })
  .error(function(erro){
    console.log(erro);
  });

  //http://jtblin.github.io/angular-chart.js/
  //https://github.com/EixoX/exercicio-front-end-angularjs

});