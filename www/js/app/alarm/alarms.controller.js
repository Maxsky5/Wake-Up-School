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

    var successCallback = function(result) {
      var message;
      console.log
      if (result.type==='wakeup') {
        message = 'wakeup alarm detected--' + result.extra;
      } else if(result.type==='set'){
        message = 'wakeup alarm set--' + result;
      } else {
        message = 'wakeup unhandled type (' + result.type + ')';
      }

        $ionicPopup.alert({
          title: 'Success !',
          template: message
        }).then(function(res) {
        });
    };

    var errorCallback = function(result) {
      $ionicPopup.alert({
        title: 'Error !',
        template: 'Error while creating alarm'
      }).then(function(res) {
      });
    };

    //console.log(cordova);
    //console.log(window);
    //console.log(navigator.plugins);

    window.wakeuptimer.wakeup(
      successCallback,
      errorCallback,
      // a list of alarms to set
      {
        alarms : [{
          type : 'onetime',
          time : { hour : 11, minute : 20 },
          extra : { message : 'json containing app-specific information to be posted when alarm triggers' },
          message : 'Alarm has expired!'
        }]
      }
    );
  })
