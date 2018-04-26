
function members(){

   
$(".modal-body").empty()


var memberBtnOption="<button id='viewMembers'> view members</button> <button id='addMembers'> add new member</button>"
$(".modal-body").append(memberBtnOption);

$("#addMembers").on("click",function(){
    populateForm();

})

$("#viewMembers").on("click",function(){
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

        $(".modal-body").append(form);



        $("#form").on("click",function(e){
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
        for(var i =0;i<results.length;i++){
            let fname = "<br>"+results[i].firstName +" "+results[i].lastName+"<br>";

            $(".modal-body").append(fname)
        }
    })
}