angular.module('wakeupApp')
.controller('DashCtrl', function($scope, $rootScope, CoursesService) {
    var currentWeekDate = moment().startOf('week');
    var currentWeek = 0;
    currentWeekDate.hours(8);

    function getCourses(date, dayObj) {
        CoursesService.get(date)
        .then(function(courses) {
            dayObj.courses = courses;
        });
    };

    function updateWeek(refresh) {
        var today = moment();

        $scope.days = [];
        $scope.weekTitle = "";
    
        if (currentWeek == 0)
            $scope.weekTitle = "Semaine en cours";
        else if (currentWeek == -1)
            $scope.weekTitle = "Semaine dernière";
        else if (currentWeek == 1)
            $scope.weekTitle = "Semaine prochaine";
        else
            $scope.weekTitle = "Semaine " + currentWeekDate.weeks();

        var d = currentWeekDate.clone();
        for (var i = 0; i < 5; ++i) {
            var dayObj = {
                date : d.clone(),
                isToday : d.isSame(today, 'day')
            }

            // If we were asked to refresh, we firsly 
            // empty the cache for that day
            if (refresh)
                CoursesService.removeFromCache(d);

            getCourses(d, dayObj);
            $scope.days.push(dayObj);
            d.add(1, 'days');
        }
        
        // Store the cache for that new day in the local storage
        CoursesService.storeCache();

        if (currentWeek == 0)
        {
            console.log('Scrolling to today');
            /*
            scroll = no good
            
            $location.hash('today');
            $anchorScroll();*/
        }
    }

    $scope.previousWeek = function () {
        currentWeekDate.subtract(1, 'weeks');
        currentWeek--;
        updateWeek(false);
    }

    $scope.nextWeek = function () {
        currentWeekDate.add(1, 'weeks');
        currentWeek++;
        updateWeek(false);
    }

    $scope.refreshWeek = function() {
        updateWeek(true);
    }

    updateWeek(false);
})
