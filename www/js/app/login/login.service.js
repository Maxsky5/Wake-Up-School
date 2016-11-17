'use strict';

angular.module('wakeupApp')
  .factory('LoginService', function(localStorageService) {
      return {
          getLogin : function() { 
            return localStorageService.get('settings.loginName');
          },
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
