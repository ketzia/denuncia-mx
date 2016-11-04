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
    });