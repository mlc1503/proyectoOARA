function sendRegister() {
    $(".errMessage > small").css("visibility", "hidden");
    let username = $("#inputUser").val();
    let pass1 = $("#inputPass1").val();
    let pass2 = $("#inputPass2").val();
    let email = $("#inputEmail").val();

    if(username == null || username == ''){
        $(".errMessage > small").css("visibility", "visible");
        $(".errMessage > small").text("Introduce un nombre de usuario.");
        return;
    }
    
    if((pass1 == null || pass1 == "") || (pass2 == null || pass2 == "")){
        $(".errMessage > small").css("visibility", "visible");
        $(".errMessage > small").text("Rellena los dos campos de contraseñas.");
        return;
    }

    if(email == null || email == ""){
        $(".errMessage > small").css("visibility", "visible");
        $(".errMessage > small").text("Introduce un correo electrónico.");
        return;
    }



    if(verifyPasswordMatch(pass1, pass2)){

        console.log("ey");
        return;

        $.ajax({
            url: "../Controllers/registerUser.php",
            type: "POST",
            data: {
    
            },
        })
    }
    else{
        $(".errMessage > small").css("visibility", "visible");
        $(".errMessage > small").text("Las contraseñas no coinciden");
        return;
    }

}

function verifyPasswordMatch(pas1, pas2){
    if(pas1.localeCompare(pas2) == 0){ //devuelve 0 si los dos strings son iguales
        return true;
    }
    else{ //devuelve 1 o -1 si la de primera se ordena antes que la segunda, y al revés respectivamente
        return false;
    }
}