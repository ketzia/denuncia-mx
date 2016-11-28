angular.module('sampleApp', [
    'ngRoute',
    'appRoutes',
    'NerdCtrl',
    'GeekCtrl',
    'ngAria',
    'ngMaterial',
    'ngAnimate',
    'ngMessages',
    'nvd3',
    'ngFileUpload',
    'jkuri.gallery'])
    .run(function($rootScope,data) {
        $rootScope.page = "";
        $rootScope.background = "";
        $rootScope.isLoggedIn = false;

        data.obtenerDelegaciones()
            .then(function(res){
                $rootScope.delegaciones = res.data;
            });

        data.obtenerCategorias()
            .then(function(res){
                $rootScope.categorias = res.data;
            });
    })
    .config(function($mdThemingProvider){

        $mdThemingProvider.definePalette('siniestros-mx-palette',{
            '50': 'fff',
            '100': 'fff',
            '200': 'F44336',
            '300': 'F44336',
            '400': 'F44336',
            '500': 'F44336',
            '600': 'F44336',
            '700': 'F44336',
            '800': 'F44336',
            '900': 'F44336',
            'A100': 'F44336',
            'A200': 'F44336',
            'A400': 'F44336',
            'A700': 'F44336',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light

            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined
        });

        $mdThemingProvider.theme('siniestros-mx','default')
            .primaryPalette('siniestros-mx-palette');


        $mdThemingProvider.theme('docs-mx', 'default')
            .primaryPalette('green');
    });