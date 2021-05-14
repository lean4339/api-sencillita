module.exports = (sequelize, dataTypes)=>{
    const alias = "User"
    
    const columns = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false

        },      
        username : {
            type : dataTypes.STRING(100),
            allowNull: true
        },
        password : {
            type : dataTypes.STRING(200),
            allowNull: false,

        },
        email : {
            type : dataTypes.STRING(200),
            allowNull: false
        },
        avatar : {
            type: dataTypes.STRING(200),
            allowNull : true
        }
    }

    const config = {
        tableName: "users",
        underscored :false, 
        timestamps : false,
    }

    const User = sequelize.define(alias,columns,config);

    
    User.associate = function(models){
       
       User.belongsToMany(models.User,{
            as : "relacion",
            through : "relaciones", //tabla pibot o intermedia
            foreignKey : "idSeguidor",
            otherKey : "idSeguido",
            timestamps: false
        })

        /*User.hasMany(models.User,{
            as : "relacion",
            foreignKey: "id",
            timestamps: false
        })*/
        User.hasMany(models.Mensaje,{
            as: "mensajes",
            foreignKey: "idDestinatario",
            timestamps: false
        })
        User.hasMany(models.Posteo,{
            as: "posteos",
            foreignKey: "idUserPosteos",
            timestamps: false
        })
       
    }

    return User;


}