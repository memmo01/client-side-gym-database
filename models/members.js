module.exports=function(sequelize,DataTypes){

    var members = sequelize.define("member",{
        firstName:DataTypes.TEXT,
        lastName:DataTypes.TEXT,
        DOB:DataTypes.TEXT,
        address:DataTypes.TEXT,
        city:DataTypes.TEXT,
        state:DataTypes.TEXT,
        zip:DataTypes.INTEGER,
        email:DataTypes.TEXT
    },{
        timestamps:false
    })
    return members

}