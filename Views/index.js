// $(function(){ //cuando el html esté cargado:

//     var sLog;

//     //vemos si hay un usuario con la sesion iniciada
//     $.ajax({url: '../Controllers/autoLogin.php', success: function(usuarioLog){
//         sLog = usuarioLog;

//         //si hay un usuario iniciado que no sea usuarioAnonimo:
//         if(sLog != "usuarioAnonimo"){
//             $("#loginSection > a").attr("href", "./controladores/cerrarSesion.php") //hacemos que redirija a cerrar sesion
//             $("#loginText>p").html( "<p>Bienvenido, "+sLog+"</p>") //cambiamos el texto para mostrar el usuario

//             $("#loginSection").mouseover(function () {
//                 $(this).css("background-color","rgba(255, 0, 0, 0.8)");
//                 $(this).css("transition","all 0.07s ease");
//                 $(this).css("border-radius","10px");
//                 $("#loginText>p").html("<p>Cerrar Sesión</p>")
//             });
//             $("#loginSection").mouseout(function () {
//                 $(this).css("background-color","transparent");
//                 $("#loginText>p").html("<p>Bienvenido, "+sLog+"</p>");
//             });



//         }
//         //si el usuario es anonimo entonces se queda como esta

        
//     }})
// })