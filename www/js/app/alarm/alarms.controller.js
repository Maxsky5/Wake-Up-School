'use strict';

angular.module('wakeupApp')
  .controller('AlarmsCtrl', function ($scope) {
      $scope.alarms = [];

    $scope.loadAlarms = function() {
      cordova.plugins.notification.local.getAll(function (notifications) {
        $scope.alarms = notifications;
      });
    }

    if (window.cordova) {
      $scope.loadAlarms();
    } else {
      $scope.alarms = [
        {
          id: 1,
          title: 'Administration des SI',
          text: 'Salle 106 - Daniel Porro',
          at: moment().add(2, 'hours').toDate()
        },
        {
          id: 2,
          title: 'Gamification',
          text: 'Salle 212 - Trou Duc',
          at: new Date()
        }
      ];
    }
  });
