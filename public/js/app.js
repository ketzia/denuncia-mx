angular.module('sampleApp', [
    'ngRoute',
    'appRoutes',
    'NerdCtrl',

    'GeekCtrl',

    'ngAria',
    'ngMaterial',
    'ngAnimate',
    'ngMessages'])
    .run(function($rootScope) {
        $rootScope.page = "";
        $rootScope.background = "";
        $rootScope.isLoggedIn = false;
    })
    .config(function($mdThemingProvider){
        $mdThemingProvider.theme('docs-mx', 'default')
            .primaryPalette('green');
    });