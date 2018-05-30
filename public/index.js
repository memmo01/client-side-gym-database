var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var d = new Date()
var currentDate= (moment(d).format("YYYYMMDD"))

        var day=(moment().day())
        var year =(moment().year())
        var month =(moment().month())
        var date=(moment().date())

        var dates= dayOfWeek[day] + " "+ months[month]+" "+ date+", "+ year;

        $(".title-schedule").html(dates)

        $.get("/api/scheduleWK/"+currentDate+"/"+currentDate+"/",function(results){

            for(i=0;i<results.length;i++){
               var start=results[i].start_time;
               var end = results[i].end_time;
               var workout = results[i].workout;
               var id = results[i].id;


               var scheduleGrouped="<li class='list-group-item'><div class>"+workout+"<br>"+start+"-"+end+"</div><div class='numAttending' id='"+id+"'></div></li>";
           $(".scheduleG").append(scheduleGrouped)
           checkNumSignedUp(id)
           
            }


function checkNumSignedUp(id){
  $.get("/api/members/signedup/"+id,function(results){
    numAttend = results.length
   $("#"+id+"").html("Attending: "+numAttend)
  })

}
$(".numAttending").on("click",function(e){
// this will call a function to populate a modal displaying a list of names of people attending the scheduled workout
  alert(e.target.id)
})

})




