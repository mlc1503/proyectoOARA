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
    $date = $_POST["fechaReserva"];
    $nombre = $_POST["nombreCompleto"];
    $tipoVisita =$_POST["tipoVisita"];

    $insertReservaSQL = "INSERT INTO `reservas`(`user_id`, `dateReservation`, `fullName`, `tipoReserva`) VALUES ('$user_id','$date','$nombre','$tipoVisita')";

    $resInsertRes = mysqli_query($conDB, $insertReservaSQL);

    if(!$resInsertRes){ //si devuelve false(la query no se ha hecho):
        echo 0;
    }
    else{//else, devolvemos la fecha
        echo $date;
    }
}
?>