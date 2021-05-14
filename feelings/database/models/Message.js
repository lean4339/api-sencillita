module.exports = (sequelize,dataTypes)=>{
    const alias = "Mensaje"

    const columns = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },
        idDestinatario : {
            type : dataTypes.INTEGER,
            allowNull : true
        },  
        idRemitente : {
            type : dataTypes.INTEGER,
            allowNull : true
        },
        mensaje : {
            type: dataTypes.TEXT,
            allowNull: false
        }   
    }

    const config = {
        tableName: "mensajes",
        underscored :false, 
        timestamps : false
    }

    const Mensaje = sequelize.define(alias,columns,config)

    Mensaje.associate = function(models){
        Mensaje.belongsTo(models.User,{
            has: "mensajes",
            foreignKey: "idDestinatario",
            timestamps: false
        })
    }

    return Mensaje
}