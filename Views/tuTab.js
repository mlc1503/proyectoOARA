$(function(){
    tabShown(0);
})

function tabShown(tabID){
    //shows clicked tab and hides all others
    $("#profileTab").css("background-color", "rgba(255,255,255,1)");
    $("#photosTab").css("background-color", "rgba(255,255,255,1)");
    $("#observationsTab").css("background-color", "rgba(255,255,255,1)");
    $("#publicationsTab").css("background-color", "rgba(255,255,255,1)");
    
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
        $("#photosTab").css("background-color", "rgba(0,0,0,0.3)");
        $("#observations").hide();
        $("#publications").hide();
    }
    else if(tabID == 2){
        $("#datos").hide();
        $("#photos").hide();
        $("#observations").show();
        $("#observationsTab").css("background-color", "rgba(0,0,0,0.3)");
        $("#publications").hide();
    }
    else if(tabID == 3){
        $("#datos").hide();
        $("#photos").hide();
        $("#observations").hide();
        $("#publications").show();
        $("#publicationsTab").css("background-color", "rgba(0,0,0,0.3");
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