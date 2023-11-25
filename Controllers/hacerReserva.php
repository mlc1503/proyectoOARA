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
    $dni = $_POST["dni"];
    $nombre = $_POST["nombreCompleto"];
    $tipoVisita =$_POST["tipoVisita"];
    $email = $_POST["email"];
    $date = $_POST["fechaReserva"];

    $insertReservaSQL = "INSERT INTO `reservas`(`email`, `dateReservation`, `fullName`, `dni`, `tipoReserva`) VALUES ('" . $email . "','" . $date . "','" . $nombre . "','" . $dni . "', '".$tipoVisita."');";

    $resInsertObs = mysqli_query($conDB, $insertReservaSQL);


    if(!$resInsertObs){ //si devuelve false(la query no se ha hecho):
        echo 0;
    }
    else{//else, devolvemos la fecha
        echo $date;
    }
}
?>