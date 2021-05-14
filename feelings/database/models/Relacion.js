module.exports = (sequelize,dataTypes)=>{
    const alias = "Relacion"

    const columns = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },
        idSeguidor : {
            type : dataTypes.INTEGER,
            allowNull : true
        },  
        idSeguido : {
            type : dataTypes.INTEGER,
            allowNull : true
        }
    }

    const config = {
        tableName: "relaciones",
        underscored :false, 
        timestamps : false
    }

    const Relacion = sequelize.define(alias,columns,config)

    return Relacion;
}