angular
    .module('sampleApp')
    .service('d3service',d3service);
d3service.$inject= ['$http','$window','$rootScope'];

function d3service($http,$window,$rootScope){

    d3DonutCrimenDelegacion = function(id){
        return $http.get('/api/d3/donut/delegacion/'+id+'/siniestro');
    };

    d3BarCrimenDelegacion = function(id){
        return $http.get('api/d3/bar/delegacion/'+id+'/siniestro');
    };

    return{
        d3DonutCrimenDelegacion : d3DonutCrimenDelegacion,
        d3BarCrimenDelegacion   : d3BarCrimenDelegacion
    }
}