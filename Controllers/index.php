<?php 
    session_start();

    

    //datos para conectar con DB
    $servername = "localhost";
    $usernameDB = "root";
    $passDB = "";
    $nombreDB = "triproyecto_bd";

    $conDB = mysqli_connect($servername, $usernameDB, $passDB, $nombreDB);
        // Comprobamos que la conexion esté bien
        if ($conDB->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        else{
            /* si se puede acceder a la base de datos: */
            //hacemos consulta a bd
            $sqlProductoComando = "SELECT producto.idProducto, producto.precio, producto.imagen, producto.nombre, producto.idCategoria, categoria.nomCategoria FROM producto LEFT join categoria on producto.idCategoria = categoria.idCategoria;";
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