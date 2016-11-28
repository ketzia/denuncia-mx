angular.module('sampleApp').controller('detalleSiniestroCtrl', detalleSiniestroCtrl);
detalleSiniestroCtrl.$inject = ['data','$rootScope','$routeParams','$mdDialog','authentication','$mdToast','$interval'];

function detalleSiniestroCtrl(data,$rootScope,$routeParams,$mdDialog,authentication,$mdToast,$interval){

    var vm = this;

    vm.images = [];

    vm.comentario = {
        contenido:"",
        usuarioCreador: "",
        siniestro: "",
        imagenes: []
    };

    $interval(function() {
        data.obtenerComentarioPorSiniestro(vm.siniestro._id)
            .then(function(res){
                vm.comentarios = res.data;
                angular.forEach(vm.comentarios, function(value,key){
                    var fecha = new Date(value.fechaCreacion);
                    value.fechaCreacion = fecha.getDate() + "/" + fecha.getMonth()+1 + "/" +fecha.getFullYear() + " (" + fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds() +")";
                });
            });
    },3000);

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

            data.obtenerComentarioPorSiniestro(vm.siniestro._id)
                .then(function(res){
                    vm.comentarios = res.data;
                    //console.log(vm.comentarios);
                    angular.forEach(vm.comentarios, function(value,key){
                        var fecha = new Date(value.fechaCreacion);
                        value.fechaCreacion = fecha.getDate() + "/" + fecha.getMonth()+1 + "/" +fecha.getFullYear() + " (" + fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds() +")";
                    });
                });
        })
    ;

    vm.mostrarPopupComentario = function(){
        $mdDialog.show({
            templateUrl: 'views/nuevoComentario.html',
            controller: 'detalleSiniestroCtrl',
            controllerAs: 'vm',
            parent: angular.element('#contenedor'),
            clickOutsideToClose: true
        });
    };

    vm.registrarComentario = function(){
        //console.log("vamos a registar amigos")
        vm.comentario.usuarioCreador = authentication.currentUser().id;
        vm.comentario.siniestro = vm.siniestro._id;
        console.log(vm.comentario);

        data.registrarComentario(vm.comentario)
            .error(function (err) {
                $mdDialog.show($mdDialog.alert()
                    .parent(angular.element('#contenedor'))
                    .clickOutsideToClose(true)
                    .title('Error')
                    .textContent(JSON.stringify(err.message))
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Ok')
                    .targetEvent(err)
                );
            })
            .then(function (res) {
                //Subir archivos despues de registrar el siniestro
                //console.log(res.data.idSiniestro);
                /*
                if(vm.fotos){
                    vm.subirFotos(res.data.idSiniestro);
                }else{
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('¡Denuncia exitosa!')
                            .position('top right')
                            .hideDelay(3000)
                    );
                    $mdSidenav('right').close();
                }
                */
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('¡Comentario registrado exitosamentes!')
                        .position('top right')
                        .hideDelay(3000)
                );
                vm.cancelar();
            });
    };

    vm.cancelar = function(){
        $mdDialog.cancel();
    }

}



