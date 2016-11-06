angular
    .module('sampleApp')
    .service('authentication',authentication);
authentication.$inject= ['$http','$window'];

function authentication($http,$window){

    var saveToken = function(token){
        $window.localStorage['mean-token'] = token;
    };

    var getToken = function(){
        return $window.localStorage['mean-token'];
    };

    register = function (user) {
        return $http.post('/api/user/register',user)
            .success(function(data){
                saveToken(data.token);
            });
    };

    login = function(user){
      return $http.post('/api/user/login',user)
          .success(function(data){
             saveToken(data.token);
          });
    };

    logout = function(user){
        $window.localStorage.removeItem('mean-token');
    };

    var isLoggedIn = function(){
        var token = getToken();
        var payload;
        if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return payload.exp > Date.now() / 1000;
        }else{
            return false;
        }
    };

    var currentUser = function(){
        if(isLoggedIn()){
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return{
                id: payload._id,
                email: payload.email,
                nombre: payload.nombre
            };
        }
    };

    return{
        saveToken: saveToken,
        currentUser: currentUser,
        login: login,
        logout: logout,
        getToken: getToken,
        register:register,
        isLoggedIn: isLoggedIn
    };
}