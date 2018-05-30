module.exports=function(sequelize,DataTypes){

    var signedUp = sequelize.define("signups",{
        scheduleId:DataTypes.INTEGER,
        userID:DataTypes.INTEGER
    },{
        timestamps:false
    });

    return signedUp
}