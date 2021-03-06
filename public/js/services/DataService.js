angular
    .module('sampleApp')
    .service('data',data);
data.$inject= ['$http','$window','$rootScope'];

function data($http,$window,$rootScope){

    // api/delegaciones -> get
    var obtenerDelegaciones = function(){
        return $http.get('/api/delegaciones');
    };

    // api/categorias -> get
    var obtenerCategorias = function(){
        return $http.get('/api/categorias');
    };

    // api/siniestro/delegacion/:id
    obtenerSiniestroPorDelegacion = function(id){
        return $http.get('/api/siniestro/delegacion/'+id);
    };

    // /api/siniestro/:id
    obtenerSiniestroPorId = function(id){
        return $http.get('/api/siniestro/'+id);
    };

    // api/siniestro/usuario/:id
    obtenerSiniestrosPorUsuario = function(id){
        return $http.get('api/siniestro/usuario/'+id);
    };

    // /api/comentarios/siniestro/:id
    obtenerComentarioPorSiniestro = function(id){
        return $http.get('/api/comentarios/siniestro/'+id);
    };


    // api/siniestro/anuncio/:id
    obtenerAnuncionPorDelegacion = function(id){
        return $http.get('/api/siniestro/anuncio/'+id);
    };

    // api/siniestro/register -> post
    registrarSiniestro = function(siniestro){
        return $http.post('/api/siniestro/register',siniestro);
    };

    // api/comentario/register -> post
    registrarComentario = function(comentario){
        return $http.post('/api/comentario/register',comentario);
    };

    // api/delegacion/:id
    obtenerDelegacionPorId = function(id){
        return $http.get('/api/delegacion/'+id);
    };

    return{
        obtenerDelegaciones : obtenerDelegaciones,
        obtenerCategorias : obtenerCategorias,
        obtenerDelegacionPorId : obtenerDelegacionPorId,
        registrarSiniestro : registrarSiniestro,
        registrarComentario : registrarComentario,
        obtenerComentarioPorSiniestro: obtenerComentarioPorSiniestro,
        obtenerSiniestroPorDelegacion : obtenerSiniestroPorDelegacion,
        obtenerSiniestrosPorUsuario : obtenerSiniestrosPorUsuario,
        obtenerSiniestroPorId : obtenerSiniestroPorId
    }
}