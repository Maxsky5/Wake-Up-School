angular.module('wakeupApp')
  .controller('AlarmsCtrl', function ($scope, $rootScope, $ionicPopup) {
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


    var now                = new Date().getTime(),
      _60_seconds_from_now = new Date(now + 60*1000);

    window.plugin.notification.local.add({
      id:      1,
      title:   'Reminder',
      message: 'Dont forget to buy some flowers.',
      repeat:  'weekly',
      date:    _60_seconds_from_now
    });

        //$ionicPopup.alert({
        //  title: 'Success !',
        //  template: message
        //}).then(function(res) {
        //});

  })
