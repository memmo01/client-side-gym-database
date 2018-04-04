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

               var scheduleGrouped="<li class='list-group-item'><div class>"+workout+"<br>"+start+"-"+end+"</div></li>";
           $(".scheduleG").append(scheduleGrouped)
           
            }


})