module.exports = (sequelize, dataTypes)=>{
    const alias = "Imagen"
    
    const columns = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },      
        idUserImagenes : {
            type : dataTypes.INTEGER,
            allowNull: true
        },
        imagenUno : {
            type: dataTypes.STRING(200),
            allowNull : true
        },
        imagenDos : {
            type: dataTypes.STRING(200),
            allowNull : true
        },
        imagenTres : {
            type: dataTypes.STRING(200),
            allowNull : true
        },
        imagenCuatro : {
            type: dataTypes.STRING(200),
            allowNull : true
        },
        imagenCinco : {
            type: dataTypes.STRING(200),
            allowNull : true
        }
    }

    const config = {
        tableName: "imagenes",
        underscored :false, 
        timestamps : false,
    }

    const Imagen = sequelize.define(alias,columns,config);

    Imagen.associate = function(models){
        
        Imagen.belongsTo(models.Posteo,{
            as : "imagenesPosteos",
            foreignKey: "id",
            timestamps: false
        })

    }
    

    return Imagen;


}