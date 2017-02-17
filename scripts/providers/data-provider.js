angular.module('dashboardApp').factory('dataProvider', function($http) {

  return {
    getData: function(onSuccess, onError) {
      return $http.get('../../data/example-data.js')
        .success(onSuccess)
        .error(onError);
    }
  };

});
