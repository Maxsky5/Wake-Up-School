angular.module('wakeupApp')
  .controller('AlarmDetailCtrl', function ($scope, $rootScope) {
    $scope.alarm = {
      id: 1,
      name: 'Porro',
      date: new Date()
    };
  })
