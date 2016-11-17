angular.module('wakeupApp')
  .factory('NotificationService', function() {
    return {
      set : function(course) {
        //alert('NotifSrv - set : ' + course.start.clone().format('YYYY-MM-DD HH:mm'));
        cordova.plugins.notification.local.isPresent(course.id, function (present) {
          if (present) {
            alert('update');
            cordova.plugins.notification.local.update({
              id: course.id,
              title: course.name,
              text: 'Salle ' + course.room + (course.teacher ? (' avec ' + course.teacher) : ''),
              at: course.start.clone().subtract(87, 'minutes').toDate(),
              data: { updated: true }
            });
          } else {
            alert('create');
            cordova.plugins.notification.local.schedule({
              id: course.id,
              title: course.name,
              text: 'Salle ' + course.room + (course.teacher ? (' avec ' + course.teacher) : ''),
              at: course.start.clone().subtract(87, 'minutes').toDate()
            });
          }
        });
      },
      getAll: function() {
        cordova.plugins.notification.local.getAllIds(function (ids) {
          alert(ids.length);
          //for (var i in ids) {
            //alert(notifications[i].id);
          //}
        });
      }
    };
  })
