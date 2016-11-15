angular.module('sampleApp', [
    'ngRoute',
    'appRoutes',
    'NerdCtrl',
    'GeekCtrl',
    'ngAria',
    'ngMaterial',
    'ngAnimate',
    'ngMessages'])
    .run(function($rootScope,data) {
        $rootScope.page = "";
        $rootScope.background = "";
        $rootScope.isLoggedIn = false;

        data.obtenerDelegaciones()
            .then(function(res){
                $rootScope.delegaciones = res.data;
            });
    })
    .config(function($mdThemingProvider){
        $mdThemingProvider.theme('docs-mx', 'default')
            .primaryPalette('green');
    });