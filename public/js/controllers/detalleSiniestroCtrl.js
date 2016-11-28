angular.module('sampleApp').controller('detalleSiniestroCtrl', detalleSiniestroCtrl);
detalleSiniestroCtrl.$inject = ['data','$rootScope','$routeParams'];

function detalleSiniestroCtrl(data,$rootScope,$routeParams){

    var vm = this;

    vm.images = [];

    data.obtenerSiniestroPorId($routeParams.id)
        .then(function(res){
            vm.siniestro = res.data;
            var fecha = new Date(vm.siniestro.fechaIncidente);
            vm.siniestro.fechaIncidente = fecha.getDate() + "/" + fecha.getMonth()+1 +"/" +fecha.getFullYear();
            angular.forEach(vm.siniestro.imagenes, function(value,key){
                var tmp = {
                    thumb:"",
                    img:""
                };
                tmp.thumb = value;
                tmp.img = value;
                vm.images.push(tmp);
            });
        })
    ;

}



