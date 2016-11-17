angular.module('wakeupApp')
  .factory('NotificationService', function () {
    return {
      set: function (c) {
        (function (course) {
          var date = course.start.clone().add(2, 'minutes').toDate();
          cordova.plugins.notification.local.isPresent(course.id, function (present) {
            if (present) {
              //alert('NotifSrv - update : ' + moment(date).format('YYYY-MM-DD HH:mm'));
              cordova.plugins.notification.local.update({
                id: course.id,
                title: course.name,
                text: 'Salle ' + course.room + (course.teacher ? (' avec ' + course.teacher) : ''),
                at: date,
                data: {updated: true}
              });
            } else {
              //alert('NotifSrv - update : ' + moment(date).format('YYYY-MM-DD HH:mm'));
              cordova.plugins.notification.local.schedule({
                id: course.id,
                title: course.name,
                text: 'Salle ' + course.room + (course.teacher ? (' avec ' + course.teacher) : ''),
                at: date
              });
            }
          });
        })(c);
      }
    };
  })
