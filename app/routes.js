var User = require('./models/User');

module.exports = function(app) {
    // API v1 - Denuncia-mx
    // template -> /api/route


    app.get('/api/users', function(req,res){
        User.find({},function(err,data){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(data);
            }
        });
    });

    app.post('/api/user/register', function(req,res){
        var user = new User();
        user.nombre =  req.body.nombre;
        user.apellidoPaterno = req.body.apellidoPaterno;
        user.apellidoMaterno = req.body.apellidoMaterno;
        user.nombreUsuario = req.body.nombreUsuario;
        user.email = req.body.email;

        user.save(function(err){
            if(err){
                res.status(500).json(err);
            }else{
                console.log("Usuario registrado");
                res.status(200);
            }
        });
    });

    app.post('/api/user/login',function(req,res){
       // Todo logear usuario
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};

