

module.exports=function(sequelize,DataTypes){

 var schedule= sequelize.define("Schedule",{
     date:DataTypes.TEXT,
     start_time:DataTypes.TEXT,
     end_time:DataTypes.TEXT,
     workout:DataTypes.TEXT

 });
 return schedule;
}