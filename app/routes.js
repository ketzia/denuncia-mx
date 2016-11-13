var User = require('./models/User');
var Delegacion = require('./models/Delegacion');

var passport = require('passport');


module.exports = function(app) {
    // API v1 - Denuncia-mx
    // template URL -> /api/route

    app.get('/api/users', function(req,res){
        User.find({},function(err,data){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(data);
            }
        }).populate('delegacion');
    });

    app.get('/api/delegaciones', function(req,res){
        Delegacion.find({},function(err,data){
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
        user.delegacion = req.body.delegacion;
        user.setPassword(req.body.password);

        user.save(function(err){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200);
                var token = user.generateJwt();
                //console.log(token);
                res.json({
                    "token":token
                });
            }
        });
    });

    app.post('/api/user/login',function(req,res){
        passport.authenticate('local', function (err, user, info) {
            var token;
            if(err){
                res.status(404).json(err);
                return;
            }
            if(user){
                token = user.generateJwt();
                res.status(200);
                //console.log(token);
                res.json({
                    "token":token
                });
            }else{
                // Aqui enviamos la informacion del error
                res.status(401).json(info);
            }
        })(req,res);
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};

