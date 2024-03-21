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
    $user_id = $_POST["user_id"];
    $email = $_POST["email"];
    $psw = $_POST["password"];

    $updateUser = "UPDATE `usuarios` SET `email` = '$email',`pass` = '$psw' WHERE `user_id` = $user_id;";

    if (mysqli_query($conDB, $updateUser)){
        echo 1;
    }
    else{
        echo 0;
    }
}
?>