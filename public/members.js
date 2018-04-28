
function members(){

   
$(".modal-body").empty()
  $(".modal-schedule").empty()


var memberBtnOption="<button id='viewMembers'> view members</button> <button id='addMembers'> add new member</button>"
$(".modal-body").append(memberBtnOption);

$("#addMembers").on("click",function(){
   $(".modal-schedule").empty()
    populateForm();

})

$("#viewMembers").on("click",function(){
    $(".modal-schedule").empty()
    populateMembers();
})
}

function populateForm(){

   var form ="<br><form id='form'><input type:'text' id='firstName' placeholder='first name' required> <br>";
    form+="<input type:'text' class='infoinput' id='lastName' placeholder='last name'><br>";
    form+="<input type:'text' class='infoinput' id='DOB' placeholder='mm-dd-yyyy'><br>";
    form+="<input type:'text' class='infoinput' id='address' placeholder='enter address'><br>";
    form+="<input type:'text' class='infoinput' id='city' placeholder='city'><br>";
    form+="<input type:'text' class='infoinput' id='state' placeholder='state'><br>";
    form+="<input type:'text' id='zip' placeholder='zip code'><br>";
    form+="<input type:'text' class='infoinput' id='email' placeholder='email'><br>";
        form+="<button id='submit'>submit</button> </form>";

        $(".modal-schedule").append(form);



        $("#submit").on("click",function(e){
            e.preventDefault()
          

            var member ={
                firstName:$("#firstName").val(),
                lastName:$("#lastName").val(),
                DOB:$("#DOB").val(),
                address:$("#address").val(),
                city:$("#city").val(),
                state:$("#state").val(),
                zip:$("#zip").val(),
                email:$("#email").val()
            }

            alert("member added")


            $.post("/api/member/add",member,function(){
                console.log("added")
            })

                $("#firstName").val(""),
                $("#lastName").val(""),
                $("#DOB").val(""),
                $("#address").val(""),
                $("#city").val(""),
                $("#state").val(""),
                $("#zip").val(""),
                $("#email").val("")

        })
}

function populateMembers(){
  
    $.get("/api/members/list",function(results){

        var table = $("<table>");
        var row=$("<tr>");
        var data = "<th>customer ID</th> <th>first name</th> <th>last name</th>";
        (row).append(data);
        (table).append(row);


        $(".modal-schedule").append(table)

        for(var i =0;i<results.length;i++){
           $(table).append(constructDataTorows(results[i]))
            
            
        }
    })

}



    function constructDataTorows(results){
             let fname = "<tr><td>"+results.id +"</td><td>"+results.firstName +"</td><td> "+results.lastName+"</td><td><button id="+results.id+">More Info</button></tr>";
            
             return fname
}


