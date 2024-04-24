<?php
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
        $userID = $_POST["user_id"];

        $deleteUser = "DELETE FROM `usuarios` WHERE `user_id` = $userID";
        $res1 = mysqli_query($conDB, $deleteUser);

        
        var_dump($res1);

    }
?>