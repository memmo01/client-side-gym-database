var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var now = moment();
console.log(now)

console.log(moment(now).format("YYYYMMDD"))

function viewSchedule() {
    $(".modal-body").empty()
    $(".modal-footer").empty()
    $(".modal-schedule").empty()
    $(".modal-time").empty()
    // alert("view")
    $("#modalTitle").html("schedule")

    createButtons()

}


function createButtons() {
    var tabBtns = "<div class='btn-group btn-group-toggle' data-toggle='buttons'>";
    tabBtns += "<label class='btn btn-secondary active weekBtn'>";
    tabBtns += "<input type='radio' name='options' id='option1' autocomplete='off' checked> Week</label>";
    tabBtns += "<label class='btn btn-secondary'>";
    tabBtns += "<input type='radio' name='options' id='option2' autocomplete='off'> Month </label>";
    tabBtns += "<label class='btn btn-secondary'>";
    tabBtns += "<input type='radio' name='options' id='option3' autocomplete='off'> Year</label>";
    tabBtns += "</div>";

    $(".modal-body").append(tabBtns)

    $(".weekBtn").on("click", function() {
        console.log("worked")
        // this looks up the next 7 days
        displayWkSchd(20)
    })
}




function displayWkSchd(x) {

    var d = new Date();
    var l = new Date()


    // get todays date and add 7 days to it so it can show the schedule for the next 7 days
    var date = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var day = d.getDay();

    l.setDate(d.getDate() + x)

    var futureDate = l.getDate()
    var futureMonth = l.getMonth();
    var futureYear = l.getFullYear();
    var futureDay = l.getDay();


    var futureDate = (moment(l).format("YYYYMMDD"))
    console.log("_____")
    var currentDate = (moment(d).format("YYYYMMDD"))
    console.log(month + 1);
    console.log(date);
    console.log(year);


    console.log(futureMonth + 1)
    console.log(futureDate)
    console.log(futureYear)




    //  perform a query to the database and get a weeks worth of scheduling , then post it to the modal
    // get informatin from current date and 7 days later.
    $.get("/api/scheduleWK/" + futureDate + "/" + currentDate + "/", function(results) {


        run(results)



    })
}

function run(results) {

    var sun = "<div class='card sunAg' '><div class='card-body tCard'><h5 class='card-title sunday'>Sunday</h5>";
    sun += "<p class='card-text sun-text'>"
    //    +months[month]+" "+day+", "+year+
    "</p>";
    sun += "</div></div>";

    var mon = "<div class='card monAg' '><div class='card-body tCard'><h5 class='card-title monday'>Monday</h5>";
    mon += "<p class='card-text mon-text'>"
    //    +months[month]+" "+day+", "+year+
    "</p>";
    mon += "</div></div>";

    var tues = "<div class='card tuesAg' '><div class='card-body tCard'><h5 class='card-title tuesday'>Tuesday</h5>";
    tues += "<p class='card-text tues-text'>"
    //    +months[month]+" "+day+", "+year+
    "</p>";
    tues += "</div></div>";

    var wed = "<div class='card wedAg' '><div class='card-body tCard'><h5 class='card-title wednesday'>Wednesday</h5>";
    wed += "<p class='card-text wed-text'>"
    //    +months[month]+" "+day+", "+year+
    "</p>";
    wed += "</div></div>";

    var thurs = "<div class='card thursAg' '><div class='card-body tCard'><h5 class='card-title thursday'>Thursday</h5>";
    thurs += "<p class='card-text thurs-text'>"
    //    +months[month]+" "+day+", "+year+
    "</p>";
    thurs += "</div></div>";

    var fri = "<div class='card friAg' '><div class='card-body tCard'><h5 class='card-title friday'>Friday</h5>";
    fri += "<p class='card-text fri-text'>"
    //    +months[month]+" "+day+", "+year+
    "</p>";
    fri += "</div></div>";

    var sat = "<div class='card satAg' '><div class='card-body tCard'><h5 class='card-title saturday'>Saturday</h5>";
    sat += "<p class='card-text sat-text'>"
    //    +months[month]+" "+day+", "+year+
    "</p>";
    sat += "</div></div>";


    $(".modal-body").append(sun)

    $(".modal-body").append(mon)

    $(".modal-body").append(tues)

    $(".modal-body").append(wed)

    $(".modal-body").append(thurs)

    $(".modal-body").append(fri)

    $(".modal-body").append(sat)




    var crr;

    console.log(results)


    for (i = 0; i < results.length; i++) {

        console.log(crr)




        var m = (moment(results[i].date))

        var day = (m.day())
        var year = (m.year())
        var month = (m.month())
        // var date=(m.date())
        var week = m.week()
        var test = moment().day("Sunday").week(week - 1);

        var x = test.date()
        console.log(x)



        console.log(test)

        $(".sun-text").html(months[month] + " " + x + ", " + year);

        $(".mon-text").html(months[month] + " " + (x + 1) + ", " + year);

        $(".tues-text").html(months[month] + " " + (x + 2) + ", " + year);

        $(".wed-text").html(months[month] + " " + (x + 3) + ", " + year);

        $(".thurs-text").html(months[month] + " " + (x + 4) + ", " + year);

        $(".fri-text").html(months[month] + " " + (x + 5) + ", " + year);

        $(".sat-text").html(months[month] + " " + (x + 6) + ", " + year);


        if (day == 0) {

            printToScreen(results[i], ".sunAg")
        } else if (day == 1) {
            printToScreen(results[i], ".monAg")

        } else if (day == 2) {
            printToScreen(results[i], ".tuesAg")
        } else if (day == 3) {
            printToScreen(results[i], ".wedAg")
        } else if (day == 4) {
            printToScreen(results[i], ".thursAg")
        } else if (day == 5) {
            printToScreen(results[i], ".friAg")
        } else if (day == 6) {
            printToScreen(results[i], ".satAg")
        }




        function printToScreen(results, dow) {
            var xxy = "<div class='card';'>";
            xxy += "<ul class='list-group list-group-flush'>";
            xxy += "<li class='list-group-item'>" + results.start_time + " - " + results.end_time + "<p>" + results.workout + "</li>";


            $("" + dow + "").append(xxy)
        }



    }



}




//  MAY NEED LATER **** when showing month view
// var getDaysInMonth = function(month,year) {
//   // Here January is 1 based
//   //Day 0 is the last day in the previous month
//  return new Date(year, month, 0).getDate();
// // Here January is 0 based
// // return new Date(year, month+1, 0).getDate();
// };