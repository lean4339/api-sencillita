module.exports = (sequelize,dataTypes)=>{
    const alias = "Posteo"

    const columns = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },
        idUserPosteos : {
            type : dataTypes.INTEGER,
            allowNull : true
        },
        texto : {
            type: dataTypes.TEXT,
            allowNull: false
        },
        idImagenesPosteo : {
            type : dataTypes.INTEGER,
            allowNull : true
        }
          
    }

    const config = {
        tableName: "posteos",
        underscored :false, 
        timestamps : false
    }

    const Posteo = sequelize.define(alias,columns,config)

    Posteo.associate = function(models){
        
        Posteo.belongsTo(models.User,{
            as : "posteos",
            foreignKey: "idUserPosteos",
            timestamps: false
        })
        Posteo.hasMany(models.Imagen,{
            as: "imagenes",
            foreignKey: "id",
            timestamps: false,
        })

    }

    return Posteo
}