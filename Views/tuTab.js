$(function(){
    tabShown(0);
})

function tabShown(tabID){
    //shows clicked tab and hides all others
    $("#profileTab").css("background-color", "rgba(255,255,255,1)");
    $("#profileTab").css("border-bottom", "1px solid gray");
    $("#photosTab").css("background-color", "rgba(255,255,255,1)");
    $("#photosTab").css("border-bottom", "1px solid gray");
    $("#observationsTab").css("background-color", "rgba(255,255,255,1)");
    $("#observationsTab").css("border-bottom", "1px solid gray");
    $("#publicationsTab").css("background-color", "rgba(255,255,255,1)");
    $("#publicationsTab").css("border-bottom", "1px solid gray");
    
    if(tabID == 0){
        $("#datos").show();
        $("#profileTab").css("background-color", "rgba(0,0,0,0.3)");
        $("#profileTab").css("border-bottom", "none");
        $("#photos").hide();
        $("#observations").hide();
        $("#publications").hide();
    }
    else if(tabID == 1){
        $("#datos").hide();
        $("#photos").show();
        $("#photosTab").css("background-color", "rgba(0,0,0,0.3)");
        $("#photosTab").css("border-bottom", "none");
        $("#observations").hide();
        $("#publications").hide();
    }
    else if(tabID == 2){
        $("#datos").hide();
        $("#photos").hide();
        $("#observations").show();
        $("#observationsTab").css("background-color", "rgba(0,0,0,0.3)");
        $("#observationsTab").css("border-bottom", "none");
        $("#publications").hide();
    }
    else if(tabID == 3){
        $("#datos").hide();
        $("#photos").hide();
        $("#observations").hide();
        $("#publications").show();
        $("#publicationsTab").css("background-color", "rgba(0,0,0,0.3");
        $("#publicationsTab").css("border-bottom", "none");
    }
}

function createObservation(){
    //TODO: either discrete view or modal window
    window.location.href = "createObservation.html";
}
function createPublication(){ //???? what is the final use of this?

    //TODO: either discrete view or modal window
    window.location.href = "createObservation.html";
}
function uploadPhoto(){
    //TODO: either discrete view or modal window
    window.location.href = "createObservation.html";
}