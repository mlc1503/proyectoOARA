<?php
    session_start();

    $servername = "localhost";
    $usernameDB = "root";
    $passDB = "";
    $nombreDB = "tfg_manel";

    $conDB = mysqli_connect($servername, $usernameDB, $passDB, $nombreDB);
    
    if(isset($_SESSION['id'])){//si esta iniciado:

        //miramos si se corresponde con alguno de la base de datos
        $sqlUsuarioExiste = "SELECT `username` FROM `users` WHERE `username` like '" .$_SESSION['id']."'";
        $res = mysqli_query($conDB, $sqlUsuarioExiste);

        //confirmamos que está en la bd, devolvemos la variable si está en la base de datos, si no está devolvemos usuarioAnonimo
        if(mysqli_num_rows($res) == 1){
            echo $_SESSION['id'];
        }
        else{ //si no existe, devolvemos -1
            echo -1;
        }
    }
    else{
        echo -1;
    }
?>