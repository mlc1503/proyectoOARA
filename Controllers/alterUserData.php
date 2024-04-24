<?php
    session_start();
    //conexion con DB
    $servername = "localhost";
    $usernameDB = "root";
    $passDB = "";
    $nombreDB = "tfg_manel";

    $conDB = mysqli_connect($servername, $usernameDB, $passDB, $nombreDB);

    if ($conDB->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    else{
        $user_id = $_POST["user_id"];
        $username = $_POST["username"];
        $email = $_POST["email"];
        $psw = $_POST["password"];

        /**
         * este fichero es llamado por dos funciones de js:
         *      pushEdit() -> tuTab.js
         *      saveUserEdit() -> crud.js
         * 
         * el siguiente if decide qué consulta se ejecuta dependiendo de qué función ha llamado a este fichero. 
         *  pushEdit() puede ser llamada por usuarios con ambos tipos de rol de usuario
         *  saveUserEdit() sólo puede ser llamada por administradores
         * 
         * sólo los admins pueden editar el rol de los usuarios.
         */
        
        if(isset($_POST["role"])){
            //solo ejecuta si exite valor para $role, opcion solo disponible si llama saveUserEdit()
            
            $role = $_POST["role"];
            $updateUser = "UPDATE `usuarios` SET `email` = '$email', `role` = '$role' ,`pass` = '$psw', `username` = '$username' WHERE `user_id` = $user_id;";
            if (mysqli_query($conDB, $updateUser)){
                echo 1;
            }
            else{
                echo 0;
            }
        }
        else{
            $updateUser = "UPDATE `usuarios` SET `email` = '$email', `pass` = '$psw', `username` = '$username' WHERE `user_id` = $user_id;";
            if (mysqli_query($conDB, $updateUser)){
                $_SESSION['id'] = $username;
                echo 1;
            }
            else{
                echo 0;
            }
        }

    }
?>