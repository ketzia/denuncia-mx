angular.module('sampleApp').controller('RegisterCtrl', registerCtrl);
registerCtrl.$inject = ['$http','$rootScope','authentication','$mdDialog'];

function registerCtrl($http,$rootScope,authentication,$mdDialog){
    var vm = this;

    vm.credentials = {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombreUsuario: "",
        password :"",
        email: ""
    };

    vm.onSubmit = function(){
        //console.log(vm.credentials);
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