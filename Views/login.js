$(function(){

})

function sendLogin(){
    
    let user = $("#inputUser").val();
    let pass = $("#inputPass").val();
    
    $.ajax({
        url: "../Controllers/login.php",
        type: "POST",
        data: {
            username: user,
            password: pass,
        },
        success: function(response){
            console.log(response);

            if(response == 1){ //si existe:
                $(".errMessage > small").css("visibility", "visible")  
                history.back();
                return;
            }
            else if(response == 0){ //si no existe tal usuario:
                $(".errMessage > small").css("visibility", "visible")  ;
                $(".errMessage > small").text("Las credenciales son incorrectas")
                return;
            }
            else if(response == -1){ //si hay usuarios duplicados:
                $(".errMessage > small").css("visibility", "visible")  
                $(".errMessage > small").text("Ha habido un conflicto en la base de datos");
                return;
            }

        }
    })
}