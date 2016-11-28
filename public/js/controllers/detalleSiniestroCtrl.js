angular.module('sampleApp').controller('detalleSiniestroCtrl', detalleSiniestroCtrl);
detalleSiniestroCtrl.$inject = ['data','$rootScope','$routeParams'];

function detalleSiniestroCtrl(data,$rootScope,$routeParams){

    var vm = this;

    data.obtenerSiniestroPorId($routeParams.id)
        .then(function(res){
            vm.siniestro = res.data;
            var fecha = new Date(vm.siniestro.fechaIncidente);
            vm.siniestro.fechaIncidente = fecha.getDate() + "/" + fecha.getMonth()+1 +"/" +fecha.getFullYear();
            console.log(vm.siniestro);
        })
    ;

    vm.images = [
        {thumb:'img/bellasArtes.jpg',img: 'img/bellasArtes.jpg'},
        {thumb:'img/desfile.jpg',img: 'img/desfile.jpg'}
    ];



}



