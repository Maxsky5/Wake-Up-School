angular.module('wakeupApp')
.factory('CoursesService', function($filter, $http, LoginService) {
    var courses = [];
    var login = LoginService.getLogin();

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
                name : e.querySelector('.Matiere').textContent
            };
            courses.push(obj);
        }
        return courses;
    }

    return {
        get : function(date) {
            var u ='http://edtmobilite.wigorservices.net/WebPsDyn.aspx';
            u += '?Action=posETUD&serverid=f&tel=' + login + '&date=';
            u += $filter('date')(date, "MM/dd/yyyy'%20'HH:mm");

            return $http.get(u)
                .then(function(response) {
                        // Process the HTML before passing data to
                        // controller
                        console.log("Réponse");
                        console.log(response);
                        /*
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(response.data,
                                                         'text/html');

                        var coursesRootElem = doc.getElementById('Region');
                        if (coursesRootElem == null)
                            // TODO: Handle error: Invalid html file
                            return [];
                        courses = getCoursesList(coursesRootElem);

                        console.log(courses);

                        // TODO:
                        // Add courses for current day to cache

                        return courses;*/
                    }, function(result) {
                        // TODO: Handle error
                        console.log(result);
                    }
                );
        }
    };
});
