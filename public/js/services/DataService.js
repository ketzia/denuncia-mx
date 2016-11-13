angular
    .module('sampleApp')
    .service('data',data);
data.$inject= ['$http','$window','$rootScope'];

function data($http,$window,$rootScope){

    var obtenerDelegaciones = function(){
        return $http.get('/api/delegaciones');
    };

    return{
        obtenerDelegaciones : obtenerDelegaciones
    }
}