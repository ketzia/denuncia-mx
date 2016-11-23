angular
    .module('sampleApp')
    .service('data',data);
data.$inject= ['$http','$window','$rootScope'];

function data($http,$window,$rootScope){

    var obtenerDelegaciones = function(){
        return $http.get('/api/delegaciones');
    };

    var obtenerCategorias = function(){
        return $http.get('/api/categorias');
    };

    obtenerSiniestroPorDelegacion = function(id){
        return $http.get('/api/siniestro/delegacion/'+id);
    };

    registrarSiniestro = function(siniestro){
        return $http.post('/api/siniestro/register',siniestro);
    };

    return{
        obtenerDelegaciones : obtenerDelegaciones,
        obtenerCategorias : obtenerCategorias,
        registrarSiniestro : registrarSiniestro,
        obtenerSiniestroPorDelegacion : obtenerSiniestroPorDelegacion
    }
}