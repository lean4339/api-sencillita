require("dotenv").config()
const db = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    allUsers: (req,res)=>{
        db.User.findAll()
        .then(users=>{
            res.status(200).json({
                meta: {                   
                    status: 200,
                    cantidad: users.length
                },
                data: {
                    usuarios: users
                }
            })
        })
        .catch(error=>{
            res.status(400).json(error)
        })
    },
    profile: (req,res)=>{
        db.User.findByPk(req.params.id,{
            include: [{association:"mensajes"},{association:"posteos"},{association:"relacion"} ]
        })
        .then(user=>{
            res.status(200).json({
                meta: {
                    status: 200,
                },
                data: {
                    user,
                    
                }
            })
        })
        .catch(error=>{
            res.status(400).json(error)
        })
    },
    register: (req,res)=>{
        const {email,password}= req.body
        db.User.create({
            email:email,
            password: bcrypt.hashSync(password,12),
            avatar: "http://localhost:3000/images/users/avatar.png"
        })
        .then(user=>{
            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.TOPSECRET,
                {
                    expiresIn: 60 * 60 * 12
                }
            )

            res.status(200).json({
                meta: {
                    status: 200,
                    auth: true,
                    token: token,
                    mensaje: "usuario creado"
                },
                data: {
                    user
                }
            })
        })
        .catch(error=>{
            res.status(400).json(error)
        })
    },
    login: (req,res)=>{
        const {email,password} = req.body
        db.User.findOne({
            where : {
                email
            }
        })
        .then(user => {
            
        

            if (!user || !bcrypt.compareSync(password, user.password)){
                return res.status(401).json({
                            auth : false,
                            msg : "credenciales inválidas"
                        })
            }
            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.TOPSECRET,
                {
                    expiresIn: 60 * 60 * 12
                }
            )
            res.status(200).json({
                meta: {
                    status: 200,
                    auth: true,
                    token: token,
                    mensaje: "usuario conectado"
                },
                data: {
                    user
                }
            })
    })
    .catch(error=>{
        res.status(500).json(error)
    })
    },
    editar: (req,res)=>{
        const {username} = req.body
        if(req.files){
            db.User.update({
                username: username, 
                avatar: `http://localhost:3000/public/images/users/${files[0].filename}`
            },
            {
                where: {id: req.params.id}
            })
            .then(user=>{
                res.status(200).json({
                    meta: {
                        status: 200,
                        mensaje: "Usuario modificado"
                    },
                    data: {
                        user
                    }
                })
            })
            .catch(error=>{
                res.status(400).json({error});
            })
        }else{
            db.User.update({
                username: username
            },
            {
                where: {id: req.params.id}
            })
            .then(user=>{
                res.status(200).json({
                    meta: {
                        status: 200,
                        mensaje: "Usuario modificado"
                    },
                    data: {
                        user
                    }
                })
            })
            .catch(error=>{
                res.status(400).json({error});
            })
        }
        
    },
    eliminar: (req,res)=>{
        db.User.destroy(req.params.id)
        .then(respuesta=>{
            res.status(200).json({
                meta: {
                    status: 200,
                    mensaje: "Usuario eliminado con exito"
                }
            })
        })
        .catch(error=>{
            res.status(400).json({error});
        })
    },
    seguir : (req,res)=>{
        const {idSeguidor, idSeguido} = req.params
        db.Relacion.create({
            idSeguidor,
            idSeguido
        })
        .then(relacion=>{
            res.status(200).json({
                meta: {
                    status: 200,
                    mensaje: "Usuario seguido con exito"
                }
            })
        })
        .catch(error=>{
            res.status(400).json({error})
        })
    },
    noSeguir : (req,res)=>{
        const {idSeguidor, idSeguido} = req.params
        db.Relacion.destroy({
            where: {
                [db.Sequelize.Op.or] : [{idSeguidor: idSeguidor},{idSeguido: idSeguido}]
            }
        })
        .then(resultado=>{
            res.status(200).json({
                meta: {
                    status : 200,

                    mensaje: "Usuario dejado de seguir"
                }
            })
        })
        .catch(error=>{
            res.status(400).json({error});
        })
    }
}
