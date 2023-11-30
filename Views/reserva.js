function reservar() {
    $("#errorMessage").html("");
    let dni = $("#dniInput").val().trim().toUpperCase();
    let nombreCompleto = $("#nombreInput").val().trim();
    let email = $("#emailInput").val().trim();
    let tipoVisita = $("#tipoVisitaInput").val();
    let fechaReserva = null;
    let r = true;
    try {
        fechaReserva = new Date($("#fechaReserva").val());
        if(fechaReserva > new Date()){
            fechaReserva = fechaReserva.toISOString().split('T')[0];
            if(!isDniValid(dni)){
                r = false;
                $("#errorMessage").append("El DNI introducido no es válido.<br>");
                $("#dniInput").css("border", "1px solid red");
            }
            if(!isEmailValid(email) || isEmpty(email)){
                r = false;
                $("#emailInput").css("border", "1px solid red");
                $("#errorMessage").append("El email introducido no es válido.<br>");
            }
            if(isEmpty(nombreCompleto)){
                r = false;
                $("#nombreInput").css("border", "1px solid red");
                $("#errorMessage").append("El nombre no puede estar vacío.<br>");
            }
            if(r){
                //si todo está correcto, post:
                $.post('../Controllers/hacerReserva.php',
                {
                    dni: dni,
                    nombreCompleto: nombreCompleto,
                    email: email,
                    tipoVisita: tipoVisita,
                    fechaReserva: fechaReserva
                }
                ).done(function(response){
                    console.log(typeof response);
                    if(response == 0){
                        alert("Ha habido un error al crear la reserva.\nUno o más datos ya existen.")
                    }
                    else{
                        alert("Listo! Tu reserva está hecha para el "+response+".")
                    }
                });
            }
        }
        else{
            throw new RangeError;
        }
    } catch (RangeError) {
        $("#errorMessage").html("La fecha introducida no es válida\n");
        $("#fechaReserva").css("border", "1px solid red");
    }
    
}

function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}

function returnToNormal(input){
    //hace que se elimine el borde rojo cuando haces clic sobre el input correspondiente
    $("#" + input).css("border", "1px solid gray");
    return;
}

function isEmailValid(email){
    const emRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emRegex.test(email);
}
function isDniValid(dni){
    const dniRegex = /^\d{8}[a-zA-Z]$/;
    if (dniRegex.test(dni)){
        let dniNum = dni.substring(0,dni.length-1); //cogemos la parte de numeros
        let dniLetra = dni.substring(dni.length-1, dni.length); //cogemos la letra
        dniNum = dniNum % 23;

        var letraArr = "TRWAGMYFPDXBNJZSQVHLCKET";

        letraArr = letraArr.substring(dniNum, dniNum+1);
        return letraArr == dniLetra.toUpperCase() ? true : false;
    }
}