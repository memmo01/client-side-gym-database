

module.exports=function(sequelize,DataTypes){

 var schedule= sequelize.define("schedule",{
     date:DataTypes.TEXT,
     start_time:DataTypes.TEXT,
     end_time:DataTypes.TEXT,
     workout:DataTypes.TEXT

 },{
        timestamps:false
    });
 return schedule;
}