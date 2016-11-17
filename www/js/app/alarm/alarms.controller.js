angular.module('wakeupApp')
  .controller('AlarmsCtrl', function ($scope) {
      $scope.alarms = [
        {
          id: 1,
          name: 'Porro',
          date: moment().add(2, 'hours')
        },
        {
          id: 2,
          name: 'Gamification',
          date: new Date()
        }
      ];

    if (window.cordova) {

    }
  });
