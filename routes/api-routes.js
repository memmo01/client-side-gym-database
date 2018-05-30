var db = require("../models");
var Sequelize = require("sequelize");

module.exports=function(app){
   
   
    app.post("/api/addschedule",function(req,res){
        db.schedule.create(req.body).then(function(results){
            res.json(results)
        })
    })

     app.post("/api/member/add",function(req,res){
        db.member.create(req.body).then(function(results){
            res.json(results)
        })
    })

     app.post("/api/addNewWorkout",function(req,res){
        db.workouts.create(req.body).then(function(results){
            res.json(results)
        })
     })

    app.get("/api/members/list",function(req,res){
        db.member.findAll({}).then(function(results){
            res.json(results)
        })
    })


    app.get("/api/agenda/:date?",function(req,res){
        db.schedule.findAll({
            where:{
                date:req.params.date
            }
        }).then(function(results){
            res.json(results)
        })
    })

    app.get("/api/scheduleWK/:d?/:l?",function(req,res){
        db.schedule.findAll({
            where:{
                date:{
                    $lte:req.params.d,
                    $gte:req.params.l
                    
                }
                
            },
             order:[
                 ["date","ASC"]
             ],
           

        }).then(function(results){
            res.json(results)
        })
    })

    app.get("/api/members/signedup/:member?",function(req,res){
        db.signups.findAll({
            where:{
                scheduleId:req.params.member
            }
        }).then(function(results){
            res.json(results)
        })
    })


    app.get("/api/workouts/",function(req,res){
        db.workouts.findAll({}).then(function(results){
            res.json(results);
        })
    })

     app.get("/api/editWorkout/:workout?",function(req,res){
        db.workouts.findAll({
            where:{
                name:req.params.workout
            }
        }).then(function(results){
            res.json(results);
        })
    })

    app.put("/api/updateworkout", function(req,res){
        db.workouts.update({
            name:req.body.newName,
            duration:req.body.newDuration,
            notes:req.body.newNotes
        },{
            where:{
                id:req.body.id
            }
        }).then(function(results){
            res.json(results)
        })
    })
}