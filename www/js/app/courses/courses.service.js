angular.module('wakeupApp')
.factory('CoursesService', function($filter, $http, $q, LoginService) {
    var coursesCache = {};
    var login = LoginService.getLogin();
    var server= LoginService.getServer();

    function serializeDate(date) {
        return date.format('YYYYMMDD');
    }

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
        get : function(date) {
            var cacheIndex = serializeDate(date);

            // If we have it in cache already, don't make a new request
            if (coursesCache.hasOwnProperty(cacheIndex)) {
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
                            // TODO: Handle error: Invalid html file
                            return [];
                        
                        courses = getCoursesList(coursesRootElem);
                      
                        // Cache it in memory
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
