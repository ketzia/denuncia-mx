angular.module('sampleApp', [
    'ngRoute',
    'appRoutes',
    'NerdCtrl',
    'NerdService',
    'GeekCtrl',
    'GeekService',
    'ngMaterial'])
    .run(function($rootScope) {
        $rootScope.page = "";
    })
    .config(function($mdThemingProvider){
        $mdThemingProvider.theme('docs-mx', 'default')
            .primaryPalette('green');
    });