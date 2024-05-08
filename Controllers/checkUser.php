<?php
    $userID = $_POST['user_id'];

    //datos para conectar con DB
    $servername = "localhost";
    $usernameDB = "root";
    $passDB = "";
    $nombreDB = "tfg_manel";

    $conDB = mysqli_connect($servername, $usernameDB, $passDB, $nombreDB);
    
    $sqlUsuarioVerif = "SELECT pass FROM usuarios WHERE user_id = '$userID';";
    // echo $sqlUsuarioVerif;

        $resultadoUsuarioExiste = mysqli_query($conDB, $sqlUsuarioVerif);

        $nMatchUsuarios = mysqli_num_rows($resultadoUsuarioExiste);

        if ($nMatchUsuarios == 1) { // si existe:
            echo 1;
        }
        else {
            echo 0;
        }

?>