const db = require("../database/models")


module.exports = {
    mensajes: (req,res)=>{
        db.Mensaje.findAll({
            where: {
                [db.Sequelize.Op.or]: [{idDestinatario: req.params.idUser},{idRemitente: req.params.idUser}]
            }
        })
        .then(mensajes=>{
            res.status(200).json({
                meta: {
                    status: 200,
                    cantidad: mensajes.length
                },
                data: {
                    mensajes
                }
            })
        })
        .catch(error=>{
            res.status(400).json(error+ "!")
        })
    },
    crear : (req,res)=>{
        const {idDestinatario,idRemitente,mensaje} = req.body
        db.Mensaje.create({
            idDestinatario,
            idRemitente,
            mensaje
        })
        .then(mensaje=>{
            res.status(200).json({
                meta:{
                    status: 200,
                    mensaje: "mensaje enviado"
                },
                data:{
                    mensaje
                }
            })
        })
        .catch(error=>{
            res.status(400).json(error)
        })
    },
    eliminar : (req,res)=>{
        db.Mensaje.destroy(req.params.id)
        .then(respuesta=>{
            res.status(200).json({
                meta: {
                    status: 200,
                    mensaje: "mensaje eliminado"
                }
            })
        })
        .catch(error=>{
            res.status(400).json({error});
        })
    }
}