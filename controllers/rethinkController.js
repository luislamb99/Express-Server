const { check, validationResult } = require('express-validator');
const modelo = require('../models/usuario');
const r = require('rethinkdb');

var connection = null;
r.connect( {host: process.env.DB_HOST, port: process.env.DB_PORT}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

module.exports = {
    registro: (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        const info = new modelo.Registro(
            req.body.nombre,
            req.body.email,
            req.body.password,
            req.body.edad,
            req.body.genero,
            req.body.programa
        );

        r.db(process.env.DB_NAME).table(process.env.DB_TABLE).filter({email: req.body.email})
            .run(connection, (err, cursor) => {
                if (err) throw err;
                cursor.toArray(function(err, dato) {
                    if (err) throw err;
                    dato = dato[0];

                    let result = {};
                    let status = 201;

                    if(!dato){
                        r.db(process.env.DB_NAME).table(process.env.DB_TABLE)
                            .insert(info)
                            .run(connection, (err, dato) => {
                                if (err) throw err;
                                if(dato.inserted === 1){
                                    status = 200;
                                    result.status = status;
                                    result.mensaje = 'Usuario registrado exitosamente';
                                    res.status(status).send(result);
                                }
                            });
                    } else {
                        status = 404;
                        result.status = status;
                        result.error = 'El usuario que intenta registrar ya existe';
                        res.status(status).send(result);
                    }

                });

            });
    },
    ingreso: (req, res) => {
        const { email, password } = req.body;

        r.db(process.env.DB_NAME).table(process.env.DB_TABLE).filter({email: req.body.email})
            .run(connection, (err, cursor) => {
                if (err) throw err;
                cursor.toArray(function(err, dato) {
                    if (err) throw err;
                    dato = dato[0];
                    let result = {};
                    let status = 201;
                    if(dato){
                        const pass = dato.password;
                        if(pass === password){
                            const datosUsuario = {
                                nombre: dato.nombre,
                                email: dato.email,
                                edad: dato.edad,
                                genero: dato.genero,
                                programa: dato.programa
                            };
                            status = 201;
                            result.status = status;
                            result.mensaje = 'Credenciales válidas';
                            result.datos = datosUsuario;
                            res.status(status).send(result);
                        } else {
                            status = 404;
                            result.status = status;
                            result.error = 'Usuario y/o contraseña incorrectas';
                            res.status(status).send(result);
                        }
                    } else {
                        status = 404;
                        result.status = status;
                        result.error = 'Usuario y/o contraseña incorrectas';
                        res.status(status).send(result);
                    }

                });

            });
    }
}