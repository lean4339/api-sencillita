const db = require("../database/models")
const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;
const getBaseUrl = (req) => req.protocol + '://' + req.get('host');
module.exports = {
    documentacion: (req,res)=>{
        res.status(200).json({
            mensaje: "Bienvenido a la documentacion de mi api",

            usuarios :{
                register: {
                    url: getBaseUrl(req) + "/api/users/register",
                    mensaje: "Para registrarte debes enviar email y contraseña y luego deberas enviar el token recibido para interactuar con la api",
                    email: "type strig name email",
                    password: "type string name password"
                },
                login: {
                    url: getBaseUrl(req) + "/api/users/loguin",
                    mensaje: "Para iniciar sesion debes enviar email y contraseña  y luego deberas enviar el token recibido para interactuar con la api",
                    email: "type strig name email",
                    password: "type string name password"
                },
                allUsers: {
                    url: getBaseUrl(req) + "/api/users",
                    mensaje: "Con esa url accederas a todos los usuarios"
                },
                editar: {
                    url: getBaseUrl(req) + "/api/users/editar/:id",
                    mensaje: "deberas enviar foto si lo deseas y el id del usuario en la direccion",
                    username: "type string name username"
                },
                eliminar: {
                    url: getBaseUrl(req) + "/api/users/eliminar/:id",
                    mensaje: "deberas enviar el id del usuario a eliminar en la direccion"
                },
                profile: {
                    url: getBaseUrl(req) + "/api/users/profile/:id",
                    mensaje: "este endpoint te mostrara el perfil de usuario si envias el id de usuario en la direccion"
                },
                seguir: {
                    url: getBaseUrl(req) + "/api/users/seguir/:idSeguidor/:idSeguido",
                    mensaje: "es muy importante que envies el id del seguidor primero y luego el del seguido",
                    idSeguidor: "type string name idSeguidor",
                    idSeguido: "type string name idSeguido"
                },
                noSeguir: {
                    url: getBaseUrl(req) + "/api/users/dejar-de-seguir/:idSeguidor/:idSeguido",
                    mensaje: "es muy importante que envies el id del seguidor primero y luego el del seguido",
                    idSeguidor: "type string name idSeguidor",
                    idSeguido: "type string name idSeguido"
                }
            },
            posteos: {
                posteos : {
                    url: getBaseUrl(req) + "/api/posteos",
                    mensaje: "Con este endpoint obtienes todos los posteos"
                },
                crear: {
                    url: getBaseUrl(req) + "/api/posteos/crear",
                    mensaje: "los posteos reciben texto y hasta cinco imagenes",
                    imagenes: "limite 5",
                    texto: "type string name texto"
                },
                editar: {
                    url: getBaseUrl(req) + "/api/posteos/editar/:id",
                    mensaje: "debes enviar el id del posteo por la url",
                    imagenes: "no se pueden editar",
                    texto: "type string name texto"
                },
                eliminar: {
                    url: getBaseUrl(req) + "/api/posteos/eliminar/:id",
                    mensaje: "debes enviar el id del posteo por la url"
                }
            },
            mensajes: {
                mensajes: {
                    conversacion: {
                    url: getBaseUrl(req) + "/api/mensajes/:idUser",
                    mensaje: "este endpoint devuelve todas las conversaciones del id de usuario que pasaste por url"
                    },
                    crear: {
                        url: getBaseUrl(req) + "/api/mensajes/crear",
                        mensaje: "Este endpoint crea los mensajes",
                        idDestinatario: "type integer name idDestinatario",
                        idRemitente: "type integer name idRemitente",
                        mensaje: "type string name mensaje",
                    },
                    eliminar: {
                        url: getBaseUrl(req) + "/api/mensajes/eliminar/:id",
                        mensaje: "debes enviar el id del mensaje a eliminar"
                    }
                }
            }
        })
    }
}