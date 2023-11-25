<?php

    $user = $_POST['username'];
    $pass = $_POST['password'];

    //datos para conectar con DB
    $servername = "localhost";
    $usernameDB = "root";
    $passDB = "";
    $nombreDB = "tfg_manel";

    $conDB = mysqli_connect($servername, $usernameDB, $passDB, $nombreDB);
    // Comprobamos que la conexion esté bien
    if (!$conDB->connect_error) {
        
        // $uHash = hash('sha512', $pass);
        $uHash = $pass;

        echo verificarUsuario($user, $uHash, $conDB); //verificamos
    }
    else{
        die("Connection failed: " . $conn->connect_error);
    }


    function verificarUsuario($uName, $hashPass, $conDB){
        session_start();
        //consulta para ver si existe usuario con ese usuario y esa contraseña
        $sqlUsuarioVerif = "SELECT username, pass FROM usuarios WHERE (username = '$uName') AND (pass = '$hashPass');";

        $resultadoUsuarioExiste = mysqli_query($conDB, $sqlUsuarioVerif);

        $nMatchUsuarios = mysqli_num_rows($resultadoUsuarioExiste);

        if ($nMatchUsuarios == 1) { // si existe:
            $_SESSION['id'] = $uName;
            return 1;
            // header('Location: ' . $_SERVER['HTTP_REFERER']);
        }
        else if($nMatchUsuarios > 1){ // si hay más de dos usuarios iguales:
            return -1;
            // header('Location: ' . $_SERVER['HTTP_REFERER']);
        }
        else { //si no existe:
            return 0;
        }
    }

?>