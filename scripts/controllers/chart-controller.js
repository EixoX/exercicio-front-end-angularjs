angular.module('dashboardApp')
.controller('chartsController', function(dataProvider, infoGroupBuilder) {

  var self = this;
  this.canceledSubscriptionsInfo = {};
  this.newSubscriptionsInfo = {};
  this.keptSubscriptionsInfo = {};
  this.pendingSubscriptionsInfo = {};

  dataProvider.getData(function(response) {

    var pendingSubscriptions = response.result.children[0];
    var canceledSubscriptions = response.result.children[1];
    var keptSubscriptions = response.result.children[2];
    var newSubscriptionsInfo = response.result.children[3];

    self.canceledSubscriptionsInfo = infoGroupBuilder.buildFor(canceledSubscriptions);
    self.newSubscriptionsInfo = infoGroupBuilder.buildFor(newSubscriptionsInfo);
    self.keptSubscriptionsInfo = infoGroupBuilder.buildFor(keptSubscriptions);
    self.pendingSubscriptionsInfo = infoGroupBuilder.buildFor(pendingSubscriptions);

  }, function(err) { console.log(err); });

});
