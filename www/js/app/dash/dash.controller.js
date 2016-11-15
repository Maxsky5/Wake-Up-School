angular.module('wakeupApp')
.controller('DashCtrl', function($scope, $rootScope, CoursesService) {
    $scope.courses = [];

    $scope.getCourses = function(date) {
    CoursesService.get(date)
        .then(function(courses) {
            console.log('test1');
            console.log(courses);
            $scope.courses = courses;
        });
    };

    $scope.getCourses(new Date(2016, 10, 15, 8, 0, 0));
})
