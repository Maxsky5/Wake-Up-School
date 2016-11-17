'use strict';

angular.module('wakeupApp')
  .factory('LoginService', function() {
      return {
          getLogin : function() { return 'g.detcheverry'; },
          getServer : function() {
              // f - bordeaux
              // i - lyon
              // d - paris
              // h - nantes
              // g - arras
              // e - montpellier
              return 'f';
          }
      };
  });
