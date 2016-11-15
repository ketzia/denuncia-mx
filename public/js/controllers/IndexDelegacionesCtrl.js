angular.module('sampleApp').controller('indexDelegacionesCtrl', indexDelegacionesCtrl);
indexDelegacionesCtrl.$inject = ['data','$rootScope'];

function indexDelegacionesCtrl(data,$rootScope){

    var vm = this;

    vm.delegaciones = $rootScope.delegaciones;

    /*
    data.obtenerDelegaciones()
        .then(function(res){
                vm.delegaciones = res.data;
        });
    */


}



