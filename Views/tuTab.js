$(function(){
    tabShown("data");
    loadUserData();
    loadObservations();
})

function tabShown(idTab){
    //show data tab as default
    $("#data").show();
    $("#dataOption").css("text-decoration", "underline");
    $(".divBotonAdd").hide();
    
    $("#photos").hide();    
    $("#publications").hide();
    $("#observations").hide();
    $("#add").hide();


    //for every tab selected, we underline each corresponding menu option and show it, while hiding the others
    if (idTab == "data"){
        $("#data").show();
        $("#dataOption").css("text-decoration", "underline");
        $(".divBotonAdd").hide();

        
        $("#photos").hide();
        $("#photosOption").css("text-decoration", "none");
        $("#publications").hide();
        $("#publicOption").css("text-decoration", "none");
        $("#observations").hide();
        $("#obsOption").css("text-decoration", "none");
    }
    if (idTab == "photos"){
        $("#photos").show();
        $("#photosOption").css("text-decoration", "underline");
        
        $(".divBotonAdd").show();
        $(".boton>p").html("Añadir foto");
        $(".boton").attr("onclick", "add('addFoto')");

        
        $("#data").hide();
        $("#dataOption").css("text-decoration", "none");
        $("#publications").hide();
        $("#publicOption").css("text-decoration", "none");
        $("#observations").hide();
        $("#obsOption").css("text-decoration", "none");
    }
    if (idTab == "observations"){
        $("#observations").show();
        $("#obsOption").css("text-decoration", "underline");
        $(".divBotonAdd").show();
        $(".boton>p").html("Añadir observación");
        $(".boton").attr("onclick", "add('addObservacion')");
        
        
        $("#data").hide();
        $("#dataOption").css("text-decoration", "none");
        $("#photos").hide();
        $("#photosOption").css("text-decoration", "none");
        $("#publications").hide();
        $("#publicOption").css("text-decoration", "none");
    }
    if (idTab == "publications"){
        $("#publications").show();
        $("#publicOption").css("text-decoration", "underline");
        
        $("#data").hide();
        $("#dataOption").css("text-decoration", "none");
        $("#photos").hide();
        $("#photosOption").css("text-decoration", "none");
        $("#observations").hide();
        $("#obsOption").css("text-decoration", "none");
    }
}

function loadObservations(){ //cargamos todos los datos del usuario:

    var usr;

    //cogemos el usuario con la sesion iniciada
    $.ajax({url: '../Controllers/getObservaciones.php', success: function(obsDetails){
        obsDetails = JSON.parse(obsDetails);

        for (let i = 0; i < Object.keys(obsDetails).length; i++) {
            var Card = 
                    `<div class="card" id="card${obsDetails[i].observacion_id}">
                        <div class="obsImage"></div>
                        <div class="obsDataDiv">
                            <div class="obsTitle">
                                <p class="title">${obsDetails[i].nombreObservacion}</p>
                            </div>
                            <div class="obsData">
                                <div class="targetCoordsDiv">
                                    <div class="targetTitle"><p class="subTitle">Target:</p></div>
                                    <div class="targetData"><p class="subTitle">${obsDetails[i].targetName}</p></div>
                                </div>
                                <div class="telescopeDiv">
                                    <div class="telTitle"><p class="subTitle">Telescope:</p></div>
                                    <div class="telData"><p class="subTitle">${obsDetails[i].nombreTel}</p></div>
                                </div>
                                <div class="filtersDiv">
                                    <div class="filtersTitle"><p class="subTitle">Filters:</p></div>
                                    <div class="filtersData"><p class="subTitle">${obsDetails[i].filters}</p></div>
                                </div>
                                <div class="startDiv">
                                    <div class="startTitle"><p class="subTitle">Start:</p></div>
                                    <div class="startDate"><p class="subTitle">${obsDetails[i].observe_startdate}</p></div>
                                </div>
                                <div class="integrationDiv">
                                    <div class="integrationTitle"><p class="subTitle">Total time:</p></div>
                                    <div class="integrationTime"><p class="subTitle">${obsDetails[i].integration_totalTime}</p></div>
                                </div>
                                <div class="progressDiv">
                                    <div class="progressTitle"><p class="subTitle">Progress:</p></div>
                                    <div class="progressPerc"><p class="subTitle">${obsDetails[i].progress}%</p></div>
                                </div>
                            </div>
                        </div>
                    </div>`;

            $("#observations").append(Card);
        }
    }})

}
function loadUserData() {
    console.log(0);
}

function add(tabSelected){
    
    if(tabSelected == "addObservacion"){
        $("#observations").hide();
        $("#add").show();
        $(".boton>p").text("Cancelar");
        $(".boton").attr("onclick", "hide('addObservacion')");
    }
    else if(tabSelected == "addFoto"){
    }
}
function hide(tabSelected) {
    if(tabSelected == "addObservacion"){
        $("#observations").show();
        $("#add").hide();
        $(".boton>p").text("Añadir observación");
        $(".boton").attr("onclick", "add('addObservacion')");
    }
    else if(tabSelected == "addFoto"){
    }
}