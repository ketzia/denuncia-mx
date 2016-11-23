angular.module('sampleApp').controller('RegisterCtrl', registerCtrl);
    registerCtrl.$inject = ['$http','$rootScope','authentication','$mdDialog','data'];

function registerCtrl($http,$rootScope,authentication,$mdDialog,data){
    var vm = this;

    vm.credentials = {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombreUsuario: "",
        password :"",
        email: "",
        delegacion: ""
    };

    // Obtener delegaciones usando el servicio de datos
    data.obtenerDelegaciones()
        .then(function(res){
            vm.delegaciones = res.data;
        });


    vm.onSubmit = function(){
        if(vm.credentials.password != "" && vm.credentials.nombre != "" && vm.credentials.apellidoPaterno != "" && vm.credentials.email != "" && vm.credentials.nombreUsuario != "") {
            authentication.register(vm.credentials)
                .error(function (err) {
                    $mdDialog.show($mdDialog.alert()
                        .parent(angular.element('#contenedor'))
                        .clickOutsideToClose(true)
                        .title('Error')
                        .textContent(JSON.stringify(err.message))
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(err)
                    );
                })
                .success(function () {
                    $mdDialog.show($mdDialog.alert()
                        .parent(angular.element('#contenedor'))
                        .clickOutsideToClose(true)
                        .title(' Éxito')
                        .textContent('Usuario registrado satisfactoriamente')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                    );

                })

        } else{
            console.log("aun faltan datos");
        }
    }


}