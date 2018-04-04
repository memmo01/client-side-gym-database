var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var time = ["6:00am", "6:15am", "6:30am", "6:45am", "7:00am", "7:15am", "7:30am", "7:45am", "8:00am", "8:15am", "8:30am", "8:45am", "9:00am", "9:15am", "9:30am", "9:45am", "10:00am", "10:15am", "10:30am", "10:45am", "11:00am", "11:15am", "11:30am", "11:45am", "12:00pm", "12:15pm", "12:30pm", "12:45pm", "1:00pm", "1:15pm", "1:30pm", "1:45pm", "2:00pm", "2:15pm", "2:30pm", "2:45pm", "3:00pm", "3:15pm", "3:30pm", "3:45pm", "4:00pm", "4:15pm", "4:30pm", "4:45pm", "5:00pm", "5:15pm", "5:30pm", "5:45pm", "6:00pm", "6:15pm", "6:30pm", "6:45pm", "7:00pm", "7:15pm", "7:30pm", "7:45pm", "8:00pm", "8:15pm", "8:30pm", "8:45pm", "9:00pm"]
var month;
var year;
var day;
var d = new Date();

function addSchedule() {
    $(".modal-body").empty()

    var scheduleGroup = $("<div>");
    scheduleGroup.addClass("col-lg-12 scheduleGroup");
    $(".modal-body").append(scheduleGroup)

    $("#modalTitle").html("Add to Schedule")

    createSchForm();
}


// this creates a form to add schedule info into the database
function createSchForm() {
    //DROP DOWN FOR MONTHS
    var form = "<div class='month col-lg-3'><div class='form-group'><label for='exampleFormControlSelect1'>Month</label>";
    form += "<select class='form-control' id='monthList'> </select></div></div>";


    $(".scheduleGroup").append(form)

    var currMonth = d.getMonth()

    for (i = 0; i < months.length; i++) {
        if ([i] == currMonth) {
            var selectOp = "<option selected value=" + [i] + ">" + months[i] + "</option>"

            $("#monthList").append(selectOp);
        } else {
            var xw = "<option value=" + [i] + ">" + months[i] + "</option>";

            $("#monthList").append(xw)
        }
    }

    month = $("#monthList").val()
    month = (parseFloat(month) + parseFloat(1));

    // DROP DOWN FOR YEARS

    var currentYear = d.getFullYear()
    var yearForm = "<div class='year col-lg-3'><div class='form-group'><label for='exampleFormControlSelect1'>Year</label>";
    yearForm += "<select class='form-control' id='yearList'><option selected value=" + currentYear + ">" + currentYear + "</option>";
    yearForm += "<option value=" + (currentYear + 1) + ">" + (currentYear + 1) + "</option>";
    yearForm += "<option value=" + (currentYear + 2) + ">" + (currentYear + 2) + "</option></select></div></div>";



    $(".scheduleGroup").append(yearForm);

    year = $("#yearList").val()


    console.log(getDaysInMonth(month, year))

    var div = $("<div>");
    div.addClass("dayNum col-lg-2");

    $(".scheduleGroup").append(div);

    createDays()

    // DROP DOWN FOR DAYS
    // THI GETS THE CURRENT DAY AND GETS HOW MANY DAYS ARE IN THE MONTH AND YEAR SELECTED AND PLACES THAT INFO INTO DROPDOWN
    function createDays() {


        var daysForm = "<div class='days col-lg-12'><div class='form-group'><label for='exampleFormControlSelect1'>Day</label>";
        daysForm += "<select class='form-control' id='daysList'> </select></div></div>";

        $(".dayNum").html(daysForm)

        var btn = "<button type='button' id='try' class='btn btn-sm btn-info'>Go To Day</button>"

        $(".scheduleGroup").append(btn)
        var currDay = d.getDate()
        day = currDay;
        console.log("current " + day)
        play(day)


        // ADDING AN AREA TO SEE THE SCHEDULE FOR THAT SPECIFIC DAY THEY WANT TO ADD TO




        $("#try").on("click", function(e) {
            e.preventDefault()
            runthis()

        })


        runthis()




        // WHEN DAY IS SELECTED IN DROPDOWN
        $("#daysList").on("click", function(e) {
            e.preventDefault()
            day = $("#daysList").val();
        })




        // WHEN MONTH IS SELECTED IN DROP DOWN
        // GET THE VALUE OF THE MONTH AND ADJUST THE DAYS BASED ON MONTH AND YEAR BY RUNNING play()

        $("#monthList").on("click", function(e) {
            e.preventDefault()
            month = $("#monthList").val()
            month = ((parseFloat(month) + parseFloat(1)))


            play()

        })

        // WHEN YEAR IS SELECTED IN DROPDOWN
        // GET THE YEAR VALUE AND THEN ADJUST THE DAYS BASED ON MONTH AND YEAR BY RUNNING play()

        $("#yearList").on("click", function(e) {
            e.preventDefault()
            year = $("#yearList").val();
            play(1)
        })

    }

    function runthis() {
        day = $("#daysList").val();
        console.log(day)
        month = $("#monthList").val()
        month = ((parseFloat(month) + parseFloat(1)))

        year = $("#yearList").val();

        $(".modal-schedule").empty()
        var dayPlan = $("<div>");
        dayPlan.addClass("dayPlan col-lg-6")
        $(".modal-schedule").prepend(dayPlan);

        var ndow = new Date(months[month - 1] + "-" + day + "-" + year);
        var dow = ndow.getDay();


        var agenda = (moment(ndow).format("YYYYMMDD"))
        // FDSAFDAFDASFDSA


        console.log(agenda + "agenda");

        var x = "<div class='card agenda' '><div class='card-body tCard'><h5 class='card-title'>" + dayOfWeek[dow] + "</h5>";
        x += "<p class='card-text'>" + months[month - 1] + " " + day + ", " + year + "</p>";
        x += "</div></div>";

        $(".dayPlan").html(x)


        $.get("/api/agenda/" + agenda + "/", function(results) {

            addTxtCalndr(results)
            right()

        })



        function addTxtCalndr(data) {
            console.log(data)
            console.log("L +" + data.length)
            for (i = 0; i < data.length; i++) {
                var x = "<div class='card';'>";
                x += "<ul class='list-group list-group-flush'>";
                x += "<li class='list-group-item'>" + data[i].start_time + " - " + data[i].end_time + "<p>" + data[i].workout + "</li>";

                $(".agenda").append(x)
            }

        }
    }

    function play(currDay) {
        console.log("play")
        var days = getDaysInMonth(month, year)
        $("#daysList").empty()
        for (a = 0; a < days; a++) {
            // HAVE THE DEFAULT DAY BE TODAYS DATE FOR ADDING INTO SCHEDULE
            if (currDay == a + 1) {
                var crrDay = "<option selected value=" + [a + 1] + ">" + [a + 1] + "</option>"
                $("#daysList").append(crrDay);
            } else {
                var od = "<option value=" + [a + 1] + ">" + [a + 1] + "</option>"
                $("#daysList").append(od)

            }


        }
    }


    // WORKOUT PLANNED AND TIME IT WILL OCCUR


    // HERE WILL BE CREATING A DROPDOWN FOR TIME OPTIONS
    // FIRST A WORKOUT TIME DIV IS CREATED TO GROUP THE TIME OPTIONS TOGETHER
    function right() {
        $(".workoutTime").empty()
        $(".timeGroup").empty()
        $(".submitArea").empty()

        // var addTimeRow=$("<row>");
        // addTimeRow.addClass("addTimeRow col-lg-2");
        // addTimeRow.text("Add to Schedule")

        var timeGroup = $("<div>");
        timeGroup.addClass("timeGroup col-lg-6");

        // $(".modal-schedule").append(addTimeRow);
        $(".modal-schedule").append(timeGroup);

        var title = "<div class='tutle col-lg-12'><h3>Add Event to Schedule</h3></div>"
        var wkOutTimeStart = "<div class='col-lg-6'><div class='form-group'><label for='exampleFormControlSelect1'>start time</label>";
        wkOutTimeStart += "<select class='form-control' id='wkOutTimeStart'> </select></div></div>"

        var wkOutTimeEnd = "<div class='col-lg-6'><div class='form-group'><label for='exampleFormControlSelect1'>End time</label>";
        wkOutTimeEnd += "<select class='form-control' id='wkOutTimeEnd'> </select></div></div>"


        $(".timeGroup").append(title);
        $(".tutle").append(wkOutTimeStart);
        $(".tutle").append(wkOutTimeEnd);

        for (t = 0; t < time.length; t++) {
            var timeOption = "<option value=" + time[t] + ">" + time[t] + "</option>"

            $("#wkOutTimeStart").append(timeOption);
            $("#wkOutTimeEnd").append(timeOption)
        }



        // CREATE A DIV TO GO UNDER DATE DIV

        var wkot_rt_tm = $("<div>");
        wkot_rt_tm.addClass("workoutTime col-lg-12");


        $(".tutle").append(wkot_rt_tm);


        // CREATE DROPDOWN FORM FOR WORKOUTS TO CHOOSE FROM
        // AN API CALL WILL OCCUR HERE WHEN DATABASE IS SET UP**************

        var wkOutForm = "<div class='col-lg'><div class='form-group'><label for='exampleFormControlSelect1'>choose workout</label>";
        wkOutForm += "<select class='form-control' id='wkOutForm'> </select></div></div>"


        $(".tutle").append(wkOutForm);

        loadWorkouts()



        var addEventBtn = "<button type='button' class='btn btn-warning btn-block' id='submitAddEvent'>Submit Event</button>"

        $(".tutle").append(addEventBtn);


        // WHEN SUBMIT BUTTON IS SELECTED ALERT INPUT ON FORM

        $("#submitAddEvent").on("click", function(e) {
            e.preventDefault()
            // alerT("hi")
            var t = months[month - 1]

            var formatDate = (year + "-" + month + "-" + day)
            var tt = (moment(formatDate).format("YYYYMMDD"))
            //    GETS THE NUMERICAL VALUE OF DAY OF WEEK

            //    turns numerial value into array value from dayOfWeek


            var scheduleInfo = {
                start_time: $("#wkOutTimeStart").val(),
                end_time: $("#wkOutTimeEnd").val(),
                workout: $("#wkOutForm").val(),
                date: tt
            }

            //    THIS READ WILL CHANGE DATE INTO NURMERICAL VALUE TO THE QUERY DATABASE TO FIND DATE RANGES



            $.post("/api/addschedule", scheduleInfo, function() {
                console.log("loaded to database")

            })

            runthis();
            // alert(months[month-1]+"/" + day+"/" + year +"/ start:"+start+"/ end: "+ end+"/"+ workout)
        })



    }

}

function loadWorkouts() {
    $.get("/api/workouts", function(results) {
        console.log(results)
        console.log(results[0].name)
        for (p = 0; p < results.length; p++) {
            console.log(results[p].name + "lll")
            var wkOutOptions = "<option value =" + results[p].name + ">" + results[p].name + "</option>";

            $("#wkOutForm").append(wkOutOptions)
        }

    })
}




// THIS FUNTION RETURNS HOW MANY DAYS ARE IN A MONTH BASED ON THE MONTH AND THE YEAR PLACED INTO IT
function getDaysInMonth(month, year) {

    return new Date(year, month, 0).getDate();

};