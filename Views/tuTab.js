$(function(){
    tabShown(0);
})

function tabShown(tabID){
    //shows clicked tab and hides all others
    if(tabID == 0){
        $("#datos").show();
        $("#photos").hide();
        $("#observations").hide();
        $("#publications").hide();
    }
    else if(tabID == 1){
        $("#datos").hide();
        $("#photos").show();
        $("#observations").hide();
        $("#publications").hide();
    }
    else if(tabID == 2){
        $("#datos").hide();
        $("#photos").hide();
        $("#observations").show();
        $("#publications").hide();
    }
    else if(tabID == 3){
        $("#datos").hide();
        $("#photos").hide();
        $("#observations").hide();
        $("#publications").show();
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