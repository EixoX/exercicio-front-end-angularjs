// Vanilla Js

( function() {

  'use strict';

  // Initialize foundation

  $( document ).foundation();

  // Apply the Charts

  Chart.defaults.global.responsive = true;

  function lineChart( names, subscribers ) {
    var lineData = {
      labels: names,
      datasets: [
        {
          label: "Assinaturas novas",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "#1abc9c",
          pointColor: "#1abc9c",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#1abc9c",
          data: subscribers
        }
      ]
    };

    var myLineChart;
    var context = document.getElementById( 'lineChart' ).getContext( '2d' );
    myLineChart = new Chart( context ).Line( lineData );
  }

  function barChart( names, subscribers ) {

    var barData = {
      labels: names,
        datasets: [
          {
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "#1abc9c",
            highlightFill: "#1abc9c",
            highlightStroke: "#1abc9c",
            data: subscribers
          }
        ]
      };

      var barChart;
      var context = document.getElementById( 'barChart' ).getContext( '2d' );
      barChart = new Chart( context ).Bar( barData );
  }

  function newClientsSubcribersDescriptions( names, subscribers ) {

    var newClientsData = {
      labels: names,
        datasets: [
          {
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "#1abc9c",
            highlightFill: "#1abc9c",
            highlightStroke: "#1abc9c",
            data: subscribers
          }
        ]
      };

      var newClients;
      var context = document.getElementById( 'newSubscribers' ).getContext( '2d' );
      newClients = new Chart( context ).Bar( newClientsData );
  }

  function radarChart( names, subscribers ) {

    var radarData = {
      labels: names,
      datasets: [
        {
          label: "Tipos de Assinatura",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "#1abc9c",
          pointColor: "#1abc9c",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#1abc9c",
          data: subscribers
        }
      ]
    };

    var radarChart;
    var context = document.getElementById( 'radarChart' ).getContext( '2d' );
    radarChart = new Chart( context ).Radar( radarData );
  }

  function newClientsType( names, subscribers ) {

    var newClientsData = {
      labels: names,
      datasets: [
        {
          label: "Tipos de Assinatura",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "#1abc9c",
          pointColor: "#1abc9c",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#1abc9c",
          data: subscribers
        }
      ]
    };

    var newClients;
    var context = document.getElementById( 'newSubcribersType' ).getContext( '2d' );
    newClients = new Chart( context ).Radar( newClientsData );
  }

  // Return Data for json

  var App = angular.module( 'chartApp', [] );

  App.controller( 'ChartsController', function( $scope, $http ) {
    var apiMock = 'https://raw.githubusercontent.com/EixoX/exercicio-front-end-angularjs/master/data/example-data.js';

    $http( {
      method: 'GET',
      url: apiMock
    } ).then( function successCallback( response ) {
        $scope.data = response.data.result.children;
        $scope.subscribers = [];
        $scope.names = [];
        $scope.descriptions = [];
        $scope.keptType = [];
        $scope.keptCount = [];
        $scope.keptSubName = [];
        $scope.keptSubCount = [];
        $scope.newClientsType = [];
        $scope.newClientsSubscribers = [];
        $scope.newClientsSubName = [];
        $scope.newClientsSubCount = [];
        $scope.keptSignatures = $scope.data[ 2 ];
        $scope.newSignatures = $scope.data[ 3 ];

        for( var i in $scope.data ) {
          $scope.signatures = $scope.data[ i ];
          $scope.names.push( $scope.signatures.group.name );
          $scope.subscribers.push( $scope.signatures.subscriberCount );
          $scope.descriptions.push( $scope.signatures.group.description );
        }

        for( var kept in $scope.keptSignatures.children ) {
          $scope.keptType.push( $scope.keptSignatures.children[ kept ].group.name );
          $scope.keptCount.push( $scope.keptSignatures.children[ kept ].subscriberCount );
        }

        for( var sub in $scope.keptSignatures.subs ) {
          $scope.keptSubName.push( $scope.keptSignatures.subs[ sub ].subscriptionName );
          $scope.keptSubCount.push( $scope.keptSignatures.subs[ sub ].subscriberCount );
        }

        for( var client in $scope.newSignatures.children ) {
          $scope.newClientsType.push( $scope.newSignatures.children[ client ].group.name );
          $scope.newClientsSubscribers.push( $scope.newSignatures.children[ client ].subscriberCount );
        }

        for( var subClient in $scope.newSignatures.subs ) {
          $scope.newClientsSubName.push( $scope.newSignatures.subs[ subClient ].subscriptionName );
          $scope.newClientsSubCount.push( $scope.newSignatures.subs[ subClient ].subscriberCount );
        }

        lineChart( $scope.names, $scope.subscribers );
        barChart( $scope.keptType, $scope.keptCount );
        newClientsSubcribersDescriptions( $scope.newClientsType, $scope.newClientsSubscribers );
        radarChart( $scope.keptSubName, $scope.keptSubCount );
        newClientsType( $scope.newClientsSubName, $scope.newClientsSubCount );

      }, function errorCallback( response ) {
        if( response.status >= 400 ) {
          try {
            // return handle error
          } catch( e ) {
            console.log( e.message );
          }
        }

      } );
  } );

} )();
