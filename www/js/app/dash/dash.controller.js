angular.module('wakeupApp')
.controller('DashCtrl', function($scope, $rootScope, CoursesService) {
    $scope.courses = [];

    $scope.getCourses = function(date) {
        CoursesService.get(date)
        .then(function(courses) {
            $scope.courses = courses;
        });
    };

    var date = new Date();
    date.setHours(8);
    date.setMinutes(0);

    $scope.getCourses(date);
})
