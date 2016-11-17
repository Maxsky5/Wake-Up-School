angular.module('wakeupApp')
  .factory('NotificationService', function() {
    return {
      set : function(course) {
        cordova.plugins.notification.local.isPresent(course.id, function (present) {
          if (present) {
            //alert('NotifSrv - update : ' + course.start.clone().format('YYYY-MM-DD HH:mm'));
            cordova.plugins.notification.local.update({
              id: course.id,
              title: course.name,
              text: 'Salle ' + course.room + (course.teacher ? (' avec ' + course.teacher) : ''),
              at: course.start.clone().subtract(10, 'minutes').toDate(),
              data: { updated: true }
            });
          } else {
            //alert('NotifSrv - update : ' + course.start.clone().format('YYYY-MM-DD HH:mm'));
            cordova.plugins.notification.local.schedule({
              id: course.id,
              title: course.name,
              text: 'Salle ' + course.room + (course.teacher ? (' avec ' + course.teacher) : ''),
              at: course.start.clone().subtract(10, 'minutes').toDate()
            });
          }
        });
      }
    };
  })
