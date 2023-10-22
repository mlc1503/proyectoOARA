$(function(){
    tabShown("data");
    loadDetails();
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

function loadDetails(){ //cargamos todos los datos del usuario:

    var usr;

    //cogemos el usuario con la sesion iniciada
    $.ajax({url: '../Controllers/autoLogin.php', success: function(usuarioLog){
        usr = usuarioLog;
    }})

    //cargamos datos de usuario():
        

    //cargamos observaciones de usuario():
    
    //cargamos fotos de usuario():

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