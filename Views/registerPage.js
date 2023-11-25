function sendRegister() {
    $(".errMessage > small").css("visibility", "hidden");
    let username = $("#inputUser").val().trim();
    let pass1 = $("#inputPass1").val().trim();
    let pass2 = $("#inputPass2").val().trim();
    let email = $("#inputEmail").val().trim();

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
    
    /**
     * Si los campos no están vacíos:
     */
    if(verifyPasswordMatch(pass1, pass2) && isEmailValid(email)){
        //comprobamos que las contraseñas coinciden, y llamada:
        $.ajax({
            url: "../Controllers/registerUser.php",
            type: "POST",
            data: {
                username: username,
                password: pass1,
                email: email,
            },
            success: function(response){
                if(response.localeCompare("usernameAlreadyExists") == 0){
                    console.log("user");
                    $(".errMessage > small").css("visibility", "visible");
                    $(".errMessage > small").text("El nombre de usuario ya existe.");
                    return;
                }
                if(response.localeCompare("emailAlreadyExists") == 0){
                    console.log("email");
                    $(".errMessage > small").css("visibility", "visible");
                    $(".errMessage > small").text("Ya hay una cuenta existente con ese correo.");
                    return;
                }
                if(response == 1){
                    history.back();
                    return;
                }
                
                console.log(response);
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
    else{ //devuelve 1 o -1 si la de primera se ordena antes que la segunda y al revés respectivamente
        return false;
    }
}

function isEmailValid(email){
    const emRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emRegex.test(email);
}