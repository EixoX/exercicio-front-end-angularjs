angular.module('dashboardApp').factory('infoGroupBuilder', function() {

  return {

    buildFor: function(group) {

      var infoGroup = {};
      var summary = { total : 0, totalInMoney: 0 };

      infoGroup.group = group;
      infoGroup.title = infoGroup.group.group.description;
      infoGroup.charts = [];

      if (infoGroup.group.children.length > 0) {
        infoGroup.group.children.forEach(function(c) {

          var chart = { name: c.group.description, labels: [], data: [], totalInMoney: 0 };

          c.subs.forEach(function(sub) {
            chart.data.push(sub.subscriberCount);
            chart.labels.push(sub.subscriptionName);
            chart.totalInMoney += (sub.subscriberCount * sub.subscriptionPrice);
            summary.total += sub.subscriberCount;
          });

          infoGroup.charts.push(chart);

        });
      } else {

        var chart = { name: group.group.name, labels: [], data: [], totalInMoney: 0 };

        group.subs.forEach(function(sub) {
          chart.data.push(sub.subscriberCount);
          chart.labels.push(sub.subscriptionName);
          chart.totalInMoney += (sub.subscriberCount * sub.subscriptionPrice);
          summary.total += sub.subscriberCount;
        });

        infoGroup.charts.push(chart);

      }

      infoGroup.name = infoGroup.group.group.name;
      infoGroup.summary = summary;
      return infoGroup;

    }
  };

});
