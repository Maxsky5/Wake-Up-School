angular.module('wakeupApp')
.factory('CoursesService', function($filter, $http, $q, LoginService,
    localStorageService) {
   
    // Load cache from local storage
    var coursesCache = localStorageService.get('courses');
    if (coursesCache == null)
        coursesCache = {};

    // Get user info from the login service
    var login = LoginService.getLogin();
    var server= LoginService.getServer();

    // Returns a serialized YYYYMMDD date for cache identification purpose
    function serializeDate(date) {
        return date.format('YYYYMMDD');
    }

    // Create an object based on the given epsioline Course XML element
    function getCoursesList(elemRoot, date) {
        var courses = [];
        for (var i = 0; i < elemRoot.children.length; ++i)
        {
            var e = elemRoot.children[i];

            // Retreive start date:
            var startDate = date.clone();
            var tmp = moment(e.querySelector('.Debut').textContent, "HH:mm");
            startDate.hours(tmp.hours());
            startDate.minutes(tmp.minutes());

            // Retrieve end date:
            var endDate = date.clone();
            tmp = moment(e.querySelector('.Fin').textContent, "HH:mm");
            endDate.hours(tmp.hours());
            endDate.minutes(tmp.minutes());

            var obj = {
                start : startDate,
                end : endDate,
                teacher : e.querySelector('.Prof').textContent,
                room : e.querySelector('.Salle').textContent,
                name : e.querySelector('.Matiere').textContent,
            };
            courses.push(obj);
        }
        return courses;
    }

    return {
        // Stores the cache into the local storage
        storeCache : function() {
            console.log('Storing following cache in storage:');
            console.log(coursesCache);
            localStorageService.set('courses', coursesCache);
        },

        // Remove a day (designed by its date) from the cache
        removeFromCache : function(date) {
            var cacheIndex = serializeDate(date);
            if (coursesCache.hasOwnProperty(cacheIndex)) {
                delete coursesCache[cacheIndex];
            }
            //this.storeCache();
        },

        emptyCache : function() {
            coursesCache = {};
            localStorageService.set('courses', {});
        },

        // Returns a Promise for the Course object for given date.
        get : function(date) {
            // We are retrieving classes for the day, so make sure that the
            // date is before the beginning of the class. 8am = good
            date.hours(8);

            // Make a new request if we don't have courses for that day yet
            // or if we removed it from the cache (== null).
            var cacheIndex = serializeDate(date);
            if (coursesCache.hasOwnProperty(cacheIndex) 
                && coursesCache[cacheIndex] != null) {
                return $q(function(resolve, reject) {
                    resolve(coursesCache[cacheIndex]);
                });
            }
    
            var url ='http://edtmobilite.wigorservices.net/WebPsDyn.aspx';
            url += '?Action=posETUD&serverid=' + server + '&tel=' + login;
            url += '&date=' + date.format('MM/DD/YYYY[%20]HH:mm');

            return $http.get(url)
                    .then(function(response) {
                        // Process the HTML before passing data to
                        // controller
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(response.data,
                                                         'text/html');

                        var coursesRootElem = doc.getElementById('Region');
                        if (coursesRootElem == null)
                            // TODO: Handle error: Invalid html file?
                            return [];
                       
                        var courses = getCoursesList(coursesRootElem, date);
                
                        // Cache it in memory (for now). In order to save some 
                        // disk IO operation, cache to disk is made manually 
                        // through storeCache(). (eg: After fully loading a
                        // week)
                        coursesCache[cacheIndex] = courses;

                        return courses;
                    }, function(result) {
                        // TODO: Handle error
                        console.log(result);
                    }
                );
        }
    };
});
