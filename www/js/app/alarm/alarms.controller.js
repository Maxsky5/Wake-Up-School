angular.module('wakeupApp')
  .controller('AlarmsCtrl', function ($scope, $rootScope) {
      $scope.alarms = [
        {
          id: 1,
          name: 'Porro',
          date: new Date()
        },
        {
          id: 2,
          name: 'Gamification',
          date: new Date()
        }
      ];
  })
