$(function(){
    tabShown("data");
})

function tabShown(idTab){
    //show data tab as default
    $("#data").show();
    $("#dataOption").css("text-decoration", "underline");
    $(".divBotonAdd").hide();
    
    $("#photos").hide();    
    $("#publications").hide();
    $("#observations").hide();

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