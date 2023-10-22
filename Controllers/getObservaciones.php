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
        $sqlProductoComando = "SELECT obs.*, obj.*, tl.*
                                FROM `objetos` obj
                                LEFT JOIN `observaciones` obs ON obj.objeto_id = obs.observed_object
                                LEFT JOIN `telescopios` tl ON obs.telescopeUsed = tl.telescope_id
                                WHERE obs.created_by = (SELECT u.user_id from `usuarios` u where u.username = '".$_SESSION['id']."');";
            $resultadoProductos = mysqli_query($conDB, $sqlProductoComando);

            //metemos los resultados de la consulta a bd en un array de objetos Producto
            $arrayProductos = array();
            while ($row = $resultadoProductos->fetch_assoc()) {
                $arrayProductos[] = $row;
            }
            
            //exportamos array a JSON
            echo json_encode($arrayProductos);
    }
?>