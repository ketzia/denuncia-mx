angular.module('sampleApp').controller('indexDelegacionesCtrl', indexDelegacionesCtrl);
indexDelegacionesCtrl.$inject = ['data'];

function indexDelegacionesCtrl(data){

    var vm = this;

    data.obtenerDelegaciones()
        .then(function(res){
                vm.delegaciones = res.data;
        });



}



