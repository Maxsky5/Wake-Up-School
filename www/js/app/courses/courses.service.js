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
    function getCoursesList(elemRoot) {
        var courses = [];
        for (var i = 0; i < elemRoot.children.length; ++i)
        {
            var e = elemRoot.children[i];
            var obj = {
                start : e.querySelector('.Debut').textContent,
                end : e.querySelector('.Fin').textContent,
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

        // Returns a Promise for the Course object for given date.
        get : function(date) {
            var cacheIndex = serializeDate(date);

            // Make a new request if we don't have courses for that day yet
            // or if we removed it from the cache (== null).
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
                        
                        courses = getCoursesList(coursesRootElem);
                      
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
