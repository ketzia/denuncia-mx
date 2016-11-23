var User = require('./models/User');
var Delegacion = require('./models/Delegacion');
var Categoria = require('./models/Categoria');
var Siniestro = require('./models/Siniestro');

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

    app.get('/api/delegacion',function(req,res){
       Delegacion.findOne({nombre: req.body.nombre}, function(err,data){
          if(!data){
            res.status(500).json("No encontre esa delegacion");
          }else{
              if(err){
                  res.status(500).json(err);
              }else{
                  res.status(200).json(data);
              }
          }
       });
    });

    app.get('/api/categorias',function(req,res){
        Categoria.find({},function(err,data){
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

    app.post('/api/siniestro/register',function(req,res){
        var siniestro = new Siniestro();
        siniestro.nombre = req.body.nombre;
        siniestro.descripcion = req.body.descripcion;
        siniestro.delegacion = req.body.delegacion;
        siniestro.usuarioCreador = req.body.usuarioCreador;
        siniestro.categoria = req.body.categoria;
        siniestro.domicilio = req.body.domicilio;
        siniestro.fechaIncidente = req.body.fechaIncidente;

        siniestro.save(function(err){
           if(err){
               res.status(500).json(err);
           }else{
               res.status(200).json({"message":"Siniestro registrado"});
           }
        });
    });

    app.get('/api/siniestro/categoria/:id',function (req,res) {
       Siniestro.find({categoria:req.params.id},function(err,data){
          if(err){
              res.status(500).json(err);
          }else{
              res.status(200).json(data);
          }
       });
    });

    app.get('/api/siniestro/delegacion/:id',function(req,res){
       Siniestro.find({delegacion:req.params.id},function (err,data) {
           if(err){
               res.status(500).json(err);
           }else{
               res.status(200).json(data);
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

