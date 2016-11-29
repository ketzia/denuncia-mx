var User = require('./models/User');
var Delegacion = require('./models/Delegacion');
var Siniestro = require('./models/Siniestro');
var Categoria = require('./models/Categoria');
var Anuncio = require('./models/Anuncio');
var Comentario = require('./models/Comentario');
var passport = require('passport');
var uuid = require('node-uuid');
var multiparty = require('multiparty');
var fs = require('fs');


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

    //obtener delegacion por nombre
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

    app.get('/api/delegacion/:id', function(req,res){
       Delegacion.findOne({_id:req.params.id},function(err,data){
          if(!data) {
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

    app.post('/api/anuncio/register', function(req,res){
        var anuncio = new Anuncio();
        anuncio.titulo = req.body.titulo;
        anuncio.contenido = req.body.contenido;
        anuncio.delegacion = req.body.delegacion;

        anuncio.save(function(err){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json({"message":"Anuncio registrado"});
            }
        });
    });

    app.get('/api/anuncios', function(req,res){
        Anuncio.find({},function(err,data){
           if(err){
               res.status(500).json(err);
           }else{
               res.status(200).json(data);
           }
        });
    });

    app.get('/api/anuncio/delegacion/:id', function(req,res){
        Anuncio.find({delegacion:req.params.id},function (err,data) {
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

    app.get('/api/siniestros',function(req,res){
       Siniestro.find({},function(err,data){
          if(err){
              res.status(500).json(err);
          }else{
              res.status(200).json(data);
          }
       });
    });

    app.post('/api/siniestro/register',function(req,res){
        //console.log(req.body.fotos);
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
               res.status(200).json({"message":"Siniestro registrado","idSiniestro":siniestro._id});
           }
        });
    });

    app.post('/api/siniestro/uploadImage',function(req,res){
        var form = new multiparty.Form();
        form.parse(req, function(err,fields,files){
            //console.log(files);
            var file = files.file[0];
            var contentType = file.headers['content-type'];
            var tmpPath = file.path;
            var extIndex = tmpPath.lastIndexOf('.');
            var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
            var fileName = uuid.v4() + extension;

            var destPath = './public/imagenesSiniestros/' + fileName;
            var urlImagen = '/imagenesSiniestros/' +fileName;

            if(contentType != 'image/png' && contentType !== 'image/jpeg'){
                fs.unlink(tmpPath);
                return res.status(500).send('Unsupported file type');
            }

            fs.rename(tmpPath, destPath, function(err){
                if(err){
                    res.status(500).send(err);
                }

                Siniestro.findOne({_id:fields.idSiniestro}, function(err,siniestro){
                    if(!siniestro){
                        console.log("No encontre ese siniestro");
                    }else{
                        siniestro.imagenes.push(urlImagen);
                        siniestro.save(function(err){
                            if(err){
                                res.status(500).json(err);
                            }
                        });
                    }
                });

                res.status(200);
            });
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

    app.get('/api/siniestro/:id', function(req,res){
       Siniestro.findOne({_id:req.params.id},function(err,data){
         if(err){
             res.satus(500).json(err);
         }else{
             res.status(200).json(data);
         }
       }).populate("delegacion categoria");
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

    app.post('/api/comentario/register',function(req,res){
        var comentario = new Comentario();
        comentario.contenido = req.body.contenido;
        comentario.usuarioCreador = req.body.usuarioCreador;
        comentario.siniestro = req.body.siniestro;

        comentario.save(function(err){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json({"message":"Comentario registrado"});
            }
        });

    });

    app.get('/api/comentarios/siniestro/:id',function(req,res){
        Comentario.find({siniestro: req.params.id}, function(err,data){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(data);
            }
        });
    });


    app.get('/api/siniestro/usuario/:id',function(req,res){
        Siniestro.find({usuarioCreador:req.params.id},function(err,data){
           if(err){
               res.status(500).json(err);
           }else{
               res.status(200).json(data);
           }
        }).populate('delegacion');
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


    app.get('/api/d3/donut/delegacion/:id/siniestro',function(req,res){
        Siniestro.find({delegacion: req.params.id},function(err,data){
           if(err){
               res.status(500).json(err);
           }else{
               var siniestros = data;
               var cuentas = [];
               var datos = [];
               for(var i=0;i<siniestros.length;i++){
                   var siniestro = siniestros[i];
                   if(!cuentas[siniestro.categoria.nombre]){
                       cuentas[siniestro.categoria.nombre]=1;
                   }else{
                       cuentas[siniestro.categoria.nombre]++;
                   }
               }
               for (var k in cuentas){
                   if (cuentas.hasOwnProperty(k)) {
                       //console.log("Key is " + k + ", value is" + cuentas[k]);
                       var dato = {llave: "", valor: 0};
                       dato.llave = k;
                       dato.valor = cuentas[k];
                       datos.push(dato);
                   }
               }
               res.status(200).json(datos);
           }
        }).populate('categoria');
    });

    app.get('/api/d3/bar/delegacion/:id/siniestro',function(req,res){
        Siniestro.find({delegacion: req.params.id},function(err,data){
            if(err){
                res.status(500).json(err);
            }else{
                var siniestros = data;
                var cuentas = [];
                var datos = [];

                for(var i=0;i<siniestros.length;i++){
                    var siniestro = siniestros[i];
                    var fecha = new Date(siniestro.fechaIncidente);
                    var stringfecha = fecha.getDate() + "-" + fecha.getMonth() + "-" +fecha.getFullYear();
                    //console.log(stringfecha);
                    if(!cuentas[stringfecha]){
                        cuentas[stringfecha]=1;
                    }else{
                        cuentas[stringfecha]++;
                    }
                }

                //console.log(cuentas);

                for (var k in cuentas){
                    if (cuentas.hasOwnProperty(k)) {
                        //console.log("Key is " + k + ", value is" + cuentas[k]);
                        var dato = {llave: "", valor: 0};
                        dato.llave = k;
                        dato.valor = cuentas[k];
                        datos.push(dato);
                    }
                }

                res.status(200).json(datos);
            }
        }).populate('categoria');
    });

    app.put('/api/user/edit',function(req,res){
        User.findById(req.body.id,function(err,usuario){
           if(err){
               res.status(500).json(err);
           }else{
               usuario.nombre = req.body.nombre;
               usuario.apellidoPaterno = req.body.apellidoPaterno;
               usuario.apellidoMaterno = req.body.apellidoMaterno;
               usuario.setPassword(req.body.password);
               usuario.save(function(err){
                   if(err){
                       res.status(500).json(err);
                   }else{
                       res.status(200);
                       var token = usuario.generateJwt();
                       res.json({
                           "token":token
                       });
                   }
               });
           }
        });
    });


    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};

