
function members(){

   
$(".modal-body").empty()


var memberBtnOption="<button id='viewMembers'> view members</button> <button id='addMembers'> add new member</button>"
$(".modal-body").append(memberBtnOption);

$("#addMembers").on("click",function(){
    populateForm();

})
}

function populateForm(){

   var form ="<br><input type:'text' id='firstName' placeholder='first name'> <br>";
    form+="<input type:'text' id='lastName' placeholder='last name'><br>";
    form+="<input type:'text' id='DOB' placeholder='mm-dd-yyyy'><br>";
    form+="<input type:'text' id='address' placeholder='enter address'><br>";
    form+="<input type:'text' id='city' placeholder='city'><br>";
    form+="<input type:'text' id='state' placeholder='state'><br>";
    form+="<input type:'text' id='zip' placeholder='zip code'><br>";
    form+="<input type:'text' id='email' placeholder='email'><br>";
        form+="<button id='submit'>submit</button>";

        $(".modal-body").append(form);



        $("#submit").on("click",function(){

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
            console.log(member)

            $.post("/api/member/add",member,function(){
                console.log("added")
            })




        })
}