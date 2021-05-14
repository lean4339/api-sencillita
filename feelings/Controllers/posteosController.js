const db = require("../database/models")


module.exports = {
    allPosteos: (req,res)=>{
        db.Posteo.findAll({
            include: {association: "imagenes"}
        })
        .then(posteos=>{
            res.status(200).json({
                meta: {
                    status: 200,
                    cantidad: posteos.length
                },
                data: {
                    posteos
                }
            })
        })
        .catch(error=>{
            res.status(400).json(error+ "1")

        })
    },
    crear: (req,res)=>{
        let id;
        const {idUserPosteos,texto}= req.body
        if(req.files){
        db.Imagen.create({
            imagenUno: `http://localhost:3000/public/images/imagenes/${req.files[0].filename}`,
            imagenDos: `http://localhost:3000/public/images/imagenes/${req.files[1].filename}`,
            imagenTres: `http://localhost:3000/public/images/imagenes/${req.files[2].filename}`,
            imagenCuatro: `http://localhost:3000/public/images/imagenes/${req.files[3].filename}`,
            imagenCinco: `http://localhost:3000/public/images/imagenes/${req.files[4].filename}`,
        })
        .then(resultado=>{
            console.log(resultado)
            id= resultado.id
        })
        .catch(error=>{
            console.log(error)
        })}
        db.Posteo.create({
            idUserPosteos: idUserPosteos,
            texto: texto,
            idImagenesPosteo: id
        })
        .then(resultado=>{
            res.status(200).json({
                meta: {
                    status: 200,
                    mensaje: "posteo creado correctamente"
                },
                data: {
                    resultado
                }
            })
        })
        .catch(error=>{
            res.status(400).json({error})
        })
    },
    editar: (req,res)=>{
        db.Posteo.update({
            texto
        },{
            where: {id: req.params.id}
        })
        .then(posteo=>{
            res.status(200).json({
                meta:{
                    status: 200,
                    mensaje: "Posteo modificado con exito"
                },
                data: {
                    posteo
                }
            })
        })
        .catch(error=>{
            res.status(400).json({error})
        })
    },
    eliminar: (req,res)=>{
        db.Posteo.destroy(req.params.id)
        .then(respuesta=>{
            res.status(200).json({
                mensaje: "posteo eliminado con exito"
            })
        })
        .catch(error=>{
            res.status(400).json({error});
        })
    }
}