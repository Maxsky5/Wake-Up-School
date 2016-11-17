angular.module('wakeupApp')
.controller('DashCtrl', function($scope, $rootScope, $ionicScrollDelegate,
                                 $location, CoursesService) {
    var currentWeekDate = moment().startOf('week');
    currentWeekDate.hours(8);
    var currentWeek = 0;
    var loadedCount = 0;

    // Fetchs the courses from the service for given date.
    function getCourses(date, dayObj) {
        CoursesService.get(date)
        .then(function(courses) {
            dayObj.courses = courses;
        });
    };

    // Updates the dashboard with courses for the selected week
    function updateWeek(refresh) {
        var today = moment();
        loadedCount = 0;

        CoursesService.emptyCache();

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

        var date = currentWeekDate.clone();
        for (var i = 0; i < 5; ++i) {
            // TODO: Manage =>  isToday : d.isSame(today, 'day')

            // TODO create day obj
            var dayObj = {
                date : date.clone(),
                courses : false,
                isToday : date.isSame(today, 'day')
            };

            // If we were asked to refresh, we firstly 
            // empty the cache for that day
            if (refresh)
                CoursesService.removeFromCache(date);

            // Start to load courses for that day
            (function(d, o) {
                CoursesService.get(d).then(function(courses) {
                    o.courses = courses;
                });
            })(date, dayObj);
            
            // Don't wait until the end of the loading to display the days,
            // so they will be displayed first then be filled with their 
            // courses.
            $scope.days.push(dayObj);
            date.add(1, 'days');
        }
        
        // TODO: THIS HAS TO BE DONE ONCE WE FULLY LOADED EVERY DAYS
        // Store the cache for that new day in the local storage
        //CoursesService.storeCache();

        // Adapt the view. Scroll to today if we're on the current week page,
        // or to the top if we're on some other page.
        var handle = $ionicScrollDelegate.$getByHandle('dashDelegate');
        if (currentWeek == 0)
        {
            setTimeout(function() {
                $location.hash('today');
                // We'll animate when scrolling to today (= true)
                handle.anchorScroll(true);
            }, 10);
        }
        else
        {
            $location.hash('');
            handle.scrollTop(false);
        }
    }

    // Control that selects the previous week to be displayed
    $scope.previousWeek = function () {
        currentWeekDate.subtract(1, 'weeks');
        currentWeek--;
        updateWeek(false);
    }

    // Control that selects the next week to be displayed
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
