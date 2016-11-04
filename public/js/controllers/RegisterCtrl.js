angular.module('sampleApp').controller('RegisterCtrl', registerCtrl);
registerCtrl.$inject = ['$http','$rootScope'];

function registerCtrl($http,$rootScope){
    var vm = this;

    vm.credentials = {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombreUsuario: "",
        email: ""
    };

    vm.onSubmit = function(){
        //console.log(vm.credentials);
        if(vm.credentials.nombre != "" && vm.credentials.apellidoPaterno != "" && vm.credentials.email != "" && vm.credentials.nombreUsuario != ""){
            return $http.post('/api/user/register', vm.credentials)
                .error(function(err){
                    console.log("Hubo un error: "+ err.message);
                })
                .then(function(data){
                    console.log("Data: " + data);
                });
        }else{
            console.log("aun faltan datos");
        }

    }
}