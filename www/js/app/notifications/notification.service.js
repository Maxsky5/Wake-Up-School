angular.module('wakeupApp')
  .factory('NotificationService', function() {
    return {
      set : function(course) {
        cordova.plugins.notification.local.isPresent(course.id, function (present) {
          if (present) {
            window.plugin.notification.local.update({
              id: course.id,
              title: course.name,
              text: 'Salle ' + course.room,
              data: { updated: true }
            });
          } else {
            window.plugin.notification.local.schedule({
              id: course.id,
              title: course.name,
              text: 'Salle ' + course.room,
              at: course.start.subtract(10, 'minutes')
            });
          }
        });
      }
    };
  })
