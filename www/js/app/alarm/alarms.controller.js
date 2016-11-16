angular.module('wakeupApp')
  .controller('AlarmsCtrl', function ($scope, $rootScope, $ionicPopup) {
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

    var now                = new Date().getTime(),
      _30_seconds_from_now = new Date(now + 30*1000);

    if (window.cordova) {
      window.plugin.notification.local.add({
        id: 1,
        title: 'Reminder',
        message: 'Dont forget to buy some flowers.',
        repeat: 'weekly',
        date: _30_seconds_from_now
      });

      //$ionicPopup.alert({
      //  title: 'Success !',
      //  template: message
      //}).then(function(res) {
      //});

    }
  })
