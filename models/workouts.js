module.exports=function(sequelize,DataTypes){

        var workouts = sequelize.define("workouts",{
            name:DataTypes.TEXT,
            duration:DataTypes.TEXT,
            notes:DataTypes.TEXT
        },{
            timestamps: false
        })
        return workouts;

}


