angular.module('sampleApp', [
    'ngRoute',
    'appRoutes',
    'NerdCtrl',
    'NerdService',
    'GeekCtrl',
    'GeekService',
    'ngAria',
    'ngMaterial',
    'ngAnimate',
    'ngMessages'])
    .run(function($rootScope) {
        $rootScope.page = "";
        $rootScope.background = "";
    })
    .config(function($mdThemingProvider){
        $mdThemingProvider.theme('docs-mx', 'default')
            .primaryPalette('green');
    });