angular.module('wakeupApp')
    .controller('CoursesCtrl', function($scope, $rootScope, CoursesService) {
        $scope.courses = [];

        $scope.getCourses = function(date) {
            CoursesService.get(date)
            .then(function(courses) {
                $scope.courses = courses;
            });
        };
        $scope.getCourses(new Date(2016, 11, 15, 8, 0, 0));
    })
