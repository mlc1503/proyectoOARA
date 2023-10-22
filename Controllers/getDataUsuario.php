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
        $sqlDetallesUsuario = "SELECT * FROM `usuarios` u WHERE  u.username = '".$_SESSION['id']."';";
            $resultadoDetallesUsuario = mysqli_query($conDB, $sqlDetallesUsuario);

            //metemos los resultados de la consulta a bd en un array de objetos Producto
            $arrayUsuario = array();
            while ($row = $resultadoDetallesUsuario->fetch_assoc()) {
                $arrayUsuario[] = $row;
            }
            
            //exportamos array a JSON
            echo json_encode($arrayUsuario);
    }
?>