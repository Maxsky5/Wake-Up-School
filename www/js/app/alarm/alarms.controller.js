angular.module('wakeupApp')
  .controller('AlarmsCtrl', function ($scope, NotificationService) {
      $scope.alarms = [];

    if (window.cordova) {
      cordova.plugins.notification.local.getAll(function (notifications) {
        $scope.alarms = notifications;
      });
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

    $scope.countNotifications = function() {
      NotificationService.getAll();
    }
  });
