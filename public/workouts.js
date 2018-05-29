

function workouts() {


    $(".modal-footer").empty()
    $(".modal-body").empty()
    $(".modal-schedule").empty()
    $(".modal-time").empty()


    populateArea()

    function populateArea() {

        var workoutArea = $("<div>");
        workoutArea.addClass(workoutArea);




        var workouts = "<div class='form-group'>";
        workouts += "<label for='exampleFormControlSelect2'>workouts</label>";
        workouts += "<select multiple class='form-control WoList' id='exampleFormControlSelect2'>";

        workouts += "</select></div>";
        workouts += "<br><button type='button' class='btn btn-warning editButton'>Edit</button>";
        workouts += "<button type='button' class='btn btn-secondary addButton'>Add</button>";


        $(".modal-body").append(workoutArea);
        $(workoutArea).append(workouts)

        $.get("/api/workouts", function(results) {

            for (i = 0; i < results.length; i++) {
                var WorkoutList = "<option value=" + results[i].name + ">" + [i + 1] + "." + " " + results[i].name + "</option>"
                $(".WoList").append(WorkoutList)
            }

        })

    }
    $(".addButton").on("click", function() {
        add()
    })


    $(".editButton").on("click", function() {
        var workOutSelected = $("#exampleFormControlSelect2").val()
        if (workOutSelected == "") {
            alert("select a workout to edit")
        } else {

            edit(workOutSelected)
        }
    })
}

function add() {

    var addRoutine = "<form> <div class='form-group'>";
    addRoutine+="<input type='text' class='form-control' id='workoutName' placeholder='Name of workout'>";
    addRoutine+="<input type='text' class='form-control' id='duration' placeholder='workout duration'>";
    addRoutine+=" <textarea class='form-control' id='notes' rows='3'></textarea><button type='submit' class='btn btn-primary mb-2 inputSubmit'>Add Workout</button> </div>"
    $(".modal-body").html(addRoutine+ "<button onclick='workouts()'>back</button>")

    $(".inputSubmit").on("click",function(){
        var input ={
            name:$("#workoutName").val(),
            duration:$("#duration").val(),
            notes:$("#notes").val()
        }

        $.post("/api/addNewWorkout",input,function(){
            console.log("added")
            

        })
        alert("new workout added")
        workouts()
    })

}



function edit(workOutSelected) {

    $.get("/api/editWorkout/" + workOutSelected, function(results) {
        console.log(results)
        var id = results[0].id

        var editForm = "<label for='name'>Workout</label><input class='form-control' type='text' id='name' value =" + results[0].name + " placeholder=" + results[0].name + "><br>";
        editForm += "<label for='duration'>Duration</label><input class='form-control' type='text' id='duration' value=" + results[0].duration + " placeholder=" + results[0].duration + ">"
        editForm += "<label for='notes'>Notes</label><textarea class='form-control' id='notes' value=" + results[0].notes + " rows='3'>" + results[0].notes + "</textarea>";
        editForm += "<button type='button' class='btn btn-secondary' onclick='workouts()'>Back</button>";
        editForm += "<button type='button' class='btn btn-info updateInfo'>Update</button>"


        $(".modal-body").html(editForm)

        $(".updateInfo").on("click", function() {

            var newInfo = {
                newName: $("#name").val(),
                newDuration: $("#duration").val(),
                newNotes: $("#notes").val(),
                id: id
            }


            $.ajax({
                method: "PUT",
                url: "/api/updateworkout",
                data: newInfo
            }).done(function() {
                console.log("updating information")
                workouts()
            })


        })
    })



}