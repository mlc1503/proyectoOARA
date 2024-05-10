var obsInfo = [];
var userInfo = [];
var resInfo = [];

var fechasBloqueadas;

var tipoReservaSeleccionada, dateSelected, precioActSeleccionada, nAsistentes, precioTotal;

var date, currYear, currMonth;


$(async function(){
    await loadUserData();
    tabShown("data");

    //Si el usuario es básico, generamos el html para los datos:
    $("#data").append(
    `<div class="userImage"></div>
        <div class="flex-column space-between">
            <div class="userDetailsDiv">
                <div class="userNameTitle">
                    <p class="user title" id="usernameField">userName</p>
                    <input type="text" name="" id="usernameInput">
                </div>
                <div class="passwDiv">
                    <div><p class="passwordTitle subTitle">Contraseña:</p></div>
                    <div><input type="password" name="" id="passwordInput"></div>
                </div>
                <div class="emailDiv">
                    <div><p class="emailTitle subTitle">Email:</p></div>
                    <div><input type="email" name="" id="emailInput"></div>
                </div>
            </div>
            <div class="buttonEditDeleteDiv">
                <div class="button-cancel-color deleteUser" id="deleteUserButton" onclick="deleteUser()">
                    <p class="buttonText text-font-white">Borrar</p>
                </div>
                <div class="button-warning-color editUser" id="editUserButton" onclick="editUser()">
                    <p class="buttonText">Editar</p>
                </div>
            </div>
        </div>`
    );
    updateData();

    //cargamos el resto de apartados:
    loadObservations();
    loadCreateObs();
    loadReservas();

    if(userInfo[0].role == 1){
        //si el usuario es administrador:
        loadCRUD_Users();
        loadCRUD_Observations();
        loadCRUD_Reservas();
    }


    const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

    // getting new date, current year and month
    date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

    // storing full name of all months in array
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const renderCalendar = () => {
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
            liTag += `<li class="inactive daycell">${lastDateofLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
            // adding active class to li if the current day, month, and year matched
            let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                        && currYear === new Date().getFullYear() ? "today" : "";
            liTag += `<li class="${isToday}" id="day${i}" onclick="getDate(${i})">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
            liTag += `<li class="inactive daycell">${i - lastDayofMonth + 1}</li>`
        }
        currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
        daysTag.innerHTML = liTag;
    }
    renderCalendar();
    disableDates();

    prevNextIcon.forEach(icon => { // getting prev and next icons
        icon.addEventListener("click", () => { // adding click event on both icons
            // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
            currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

            if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
                // creating a new date of current year & month and pass it as date value
                date = new Date(currYear, currMonth, new Date().getDate());
                currYear = date.getFullYear(); // updating current year with new date year
                currMonth = date.getMonth(); // updating current month with new date month
            } else {
                date = new Date(); // pass the current date as date value
            }
            renderCalendar(); // calling renderCalendar function
            disableDates();
        });
    });

    async function disableDates() {
        //pone en rojo las fechas que están ya ocupadas por otras reservas
        await $.ajax({url: '../Controllers/getBlockedDates.php', success: function(response){
            fechasBloqueadas = JSON.parse(response);
        }});

        fechasBloqueadas.forEach(fecha => {
            //bloqueamos las fechas del mes que se muestra en el calendario
            if (fecha != null && currMonth == new Date(fecha.date).getMonth()) {
                let day = new Date(fecha.date).getDate();
                $(`li#day${day}`).addClass("disabled");
                $(`li#day${day}`).removeAttr("onclick", null);
            }
        });
        
        //desactivamos fechas anteriores a la fecha de hoy
        if(currMonth <= new Date().getMonth()){
            for (let i = 1; i < date.getDate(); i++) {
                $(`li#day${i}`).removeAttr("onclick", null);
                $(`li#day${i}`).addClass("inactive");
            }
        }

        //desactivamos fechas de meses anteriores
        if(currMonth < date.getMonth()){
            for (let i = 0; i <= new Date(currYear, currMonth + 1, 0).getDate(); i++) {
                $(`li#day${i}`).removeAttr("onclick", null);
                $(`li#day${i}`).addClass("inactive");
                $(`li#day${i}`).removeClass("disabled");
            }
        }
    }
})

function tabShown(idTab){
    //show data tab as default
    $("#data").show();
    $("#dataOption").css("text-decoration", "underline");
    $(".divBotonAdd").hide();
    
    $("#photos").hide();    
    $("#publications").hide();
    $("#observations").hide();
    $("#add").hide();

    //for every tab selected, we underline each corresponding menu option and show it, while hiding the others
    if (idTab == "data"){
        $(".content>div:not(#data)").hide();
        $("#data").show();
        $("#dataOption").css("text-decoration", "underline");
        $(".menuOption:not(#dataOption)").css("text-decoration", "none");
    }
    if (idTab == "observations"){
        $(".content>div:not(#observations)").hide();
        $(".divBotonAdd").show();
            $(".botonAdd>p").html("Añadir observación");
            $(".botonAdd>p").removeClass("text-font-white");
            $(".botonAdd>p").addClass("text-black");
            $(".botonAdd").removeClass("button-cancel-color");
            $(".botonAdd").addClass("button-default-color");
            $(".botonAdd").attr("onclick", "add('addObservacion')");
        $("#observations").show();
        $("#obsOption").css("text-decoration", "underline");
        $(".menuOption:not(#obsOption)").css("text-decoration", "none");

        hide("addObservacion"); //esto resetea el boton de añadir si lo has pulsado y cambias de tab
    }
    if (idTab == "reservas"){
        $(".content>div:not(#reservas)").hide();
        $(".divBotonAdd").show();
            $(".botonAdd>p").html("Añadir reserva");
            $(".botonAdd>p").removeClass("text-font-white");
            $(".botonAdd>p").addClass("text-black");
            $(".botonAdd").removeClass("button-cancel-color");
            $(".botonAdd").addClass("button-default-color");
            $(".botonAdd").attr("onclick", "add('addReserva')");
        $("#reservas").show();
        $("#resOption").css("text-decoration", "underline");
        $(".menuOption:not(#resOption)").css("text-decoration", "none");

        hide("addReserva"); //esto resetea el boton de añadir si lo has pulsado y cambias de tab
    }
    if (idTab == "userCRUD"){
        $(".content>div:not(#userCRUD)").hide();
        $(".divBotonAdd").show();
            $(".botonAdd>p").html("Añadir usuario");
            $(".botonAdd>p").removeClass("text-font-white");
            $(".botonAdd>p").addClass("text-black");
            $(".botonAdd").removeClass("button-cancel-color");
            $(".botonAdd").addClass("button-default-color");
            $(".botonAdd").attr("onclick", "addCRUD('usuario')");
        $("#userCRUD").show();
        $("#cr_UsersOption").css("text-decoration", "underline");
        $(".menuOption:not(#cr_UsersOption)").css("text-decoration", "none");
    }
    if (idTab == "obsCRUD"){
        $(".content>div:not(#obsCRUD)").hide();
        $(".divBotonAdd").show();
            $(".botonAdd>p").html("Añadir observación");
            $(".botonAdd>p").removeClass("text-font-white");
            $(".botonAdd>p").addClass("text-black");
            $(".botonAdd").removeClass("button-cancel-color");
            $(".botonAdd").addClass("button-default-color");
            $(".botonAdd").attr("onclick", "addCRUD('observacion')");
        $("#obsCRUD").show();
        $("#cr_ObsOption").css("text-decoration", "underline");
        $(".menuOption:not(#cr_ObsOption)").css("text-decoration", "none");
    }
    if (idTab == "resCRUD"){
        $(".content>div:not(#resCRUD)").hide();
        $(".divBotonAdd").show();
            $(".botonAdd>p").html("Añadir reserva");
            $(".botonAdd>p").removeClass("text-font-white");
            $(".botonAdd>p").addClass("text-black");
            $(".botonAdd").removeClass("button-cancel-color");
            $(".botonAdd").addClass("button-default-color");
            $(".botonAdd").attr("onclick", "addCRUD('reserva')");
        $("#resCRUD").show();
        $("#cr_ResOption").css("text-decoration", "underline");
        $(".menuOption:not(#cr_ResOption)").css("text-decoration", "none");
    }
}

function loadObservations(){
    //nos vienen todos los datos de la tabla observaciones, telescopios y objetos
    $.ajax({url: '../Controllers/getObservaciones.php', success: function(obsDetails){
        obsDetails = JSON.parse(obsDetails);

        obsInfo = obsDetails; //guardamos datos en la variable global del documento

        if (obsInfo.length != 0){
            //si hay observaciones, pintamos:
            pintarCards(obsInfo);
        }
        else{
            //si no, decimos que no hay
            $("#observations").html("<p class='buttonText'>No tienes observaciones hechas todavía</p>");
        }
    }})
}

function pintarCards(){
    $("#observations").html("");

    //pintamos las cards con toda la info necesaria
    for (let i = 0; i < Object.keys(obsInfo).length; i++) {
        var Card = 
                `<div class="card" id="card${obsInfo[i].observacion_id}" onclick="seeFullDetails(${obsInfo[i].observacion_id})">
                    <div class="obsImage"></div>
                    <div class="obsDataDiv">
                        <div class="obsTitle">
                            <p class="title">${obsInfo[i].nombreObservacion}</p>
                        </div>
                        <div class="obsData">
                            <div class="targetCoordsDiv">
                                <div class="targetTitle"><p class="subTitle">Target:</p></div>
                                <div class="targetData"><p class="subTitle">${obsInfo[i].name}</p></div>
                            </div>
                            <div class="telescopeDiv">
                                <div class="telTitle"><p class="subTitle">Telescopio:</p></div>
                                <div class="telData"><p class="subTitle">${obsInfo[i].nombreTel}</p></div>
                            </div>
                            <div class="filtersDiv">
                                <div class="filtersTitle"><p class="subTitle">Filtros:</p></div>
                                <div class="filtersData"><p class="subTitle">${obsInfo[i].filters}</p></div>
                            </div>
                            <div class="startDiv">
                                <div class="startTitle"><p class="subTitle">Fecha inic.:</p></div>
                                <div class="startDate"><p class="subTitle">${obsInfo[i].observe_startdate}</p></div>
                            </div>
                            <div class="integrationDiv">
                                <div class="integrationTitle"><p class="subTitle">Tiempo total:</p></div>
                                <div class="integrationTime"><p class="subTitle">${obsInfo[i].integration_totalTime}h</p></div>
                            </div>
                            <div class="progressDiv">
                                <div class="progressTitle"><p class="subTitle">Progreso:</p></div>
                                <div class="progressPerc"><p class="subTitle">${obsInfo[i].progress}%</p></div>
                            </div>
                        </div>
                    </div>
                </div>`;

        $("#observations").append(Card);
        $(`#card${obsInfo[i].observacion_id}`).attr("onclick", `seeFullDetails(${obsInfo[i].observacion_id})`);
    }
}

function seeFullDetails(idCard){
    //cargar detalles en modal

    // buscamos indice del array obsInfo donde obsInfo[n].observacion_id == idCard
    let n = 0;
    for (;n < obsInfo.length; n++) {
        let id = obsInfo[n].observacion_id
        if (id == idCard) {
            break;
        }
    }
    
    //segun que filtros se hayan seleccionado en la observación, creamos <p> por cada filtro
    var filtros = obsInfo[n].filters.split(",");
    var htmlFiltros = "";
    for (let index = 0; index < filtros.length; index++) {
        htmlFiltros += `<p>${filtros[index]}</p>`
    }
    
    var modal = 
    `<div class="divModal">
        <div class="modalDetallesObs">
            <div class="modalContentDiv">
                <div id="dateTimeImageDiv">
                    <div class="imageObs">
                        <img src="../Resources/m31_cut.jpg" alt="">
                    </div>
                    <div id="obsCreationDataDiv">
                        <div class="createdDiv flex space-between">
                            <p class="createdLabel">Creado el:</p>
                            <p class="createdDate">${obsInfo[n].created_at}</p>
                        </div>
                        <div class="obsStartDiv">
                            <p class="obsStartLabel">Observación comenzada el:</p>
                            <p class="obsStartDate">${obsInfo[n].observe_startdate}</p>
                        </div>
                        <div class="obsTimeDiv">
                            <p class="obsTimeLabel">Tiempo de observación total:</p>
                            <p class="obsTimeDate">${obsInfo[n].integration_totalTime}h</p>
                        </div>
                    </div>
                </div>
                <div id="generalDetailsDiv">
                    <div class="flex center">
                        <p id="tituloObsLabel" class="title text-center">${obsInfo[n].nombreObservacion}</p>
                    </div>
                    <div id="targetDetails">
                        <div class="flex space-between">
                            <p class="labelText">Objeto: </p>
                            <p class="targetName labelText">${obsInfo[n].name}</p>
                        </div>
                        <div>
                            <p id="coordsLabel" class="text-center contentText">RA: ${obsInfo[n].coord_RA} , DEC: ${obsInfo[n].coord_DEC}</p>
                            <p id="catalogLabel" class="text-center contentText">Catalogo: ${obsInfo[n].catalog}</p>
                        </div>
                    </div>
                    <div id="telescopioDetails">
                        <div class="flex space-between">
                            <p class="labelText">Telescopio:</p>
                            <p id="telescopeName" class="labelText">${obsInfo[n].nombreTel}</p>
                        </div>
                        <div>
                            <div class="flex center">
                                <p class="text-center contentText">Nombre: </p>
                                <p id="fullNomTelescope" class="text-center contentText">${obsInfo[n].fullName}</p>
                            </div>
                            <div class="flex center">
                                <p class="text-center contentText">Focal: </p>
                                <p id="focalTelescope"class="text-center contentText">${obsInfo[n].fl}mm</p>
                            </div>
                            <div class="flex center">
                                <p class="text-center contentText">Apertura: </p>
                                <p id="apertureTelescope" class="text-center contentText">${obsInfo[n].apert}</p>
                            </div>
                        </div>
                    </div>
                    <div id="filtroDetails">
                        <p class="filtroLabel labelText">Filtros:</p>
                        <div id="usedFilters">
                        ${htmlFiltros}
                        </div>
                    </div>
                    <div class="flex space-between" id="progresoDetails">
                        <p class="labelText">Progreso:</p>
                        <p id="progresoPorcentaje" class="labelText">${obsInfo[n].progress}%</p>
                    </div>
                </div>
            </div>
            <div id="eliminarBotonDiv">
                <div id="botonCerrarObs" onclick="cerrarModal()">
                    <p class="text-center buttonText text-black">Cerrar</p>
                </div>
                <div id="botonEliminarObs" class="button-cancel-color" onclick="eliminarObs(${obsInfo[n].observacion_id})">
                    <p class="text-center buttonText text-font-white">Eliminar</p>
                </div>
            </div>
        </div>
    </div>`
    //mostrar modal
    $("body").prepend(modal);
}

async function loadUserData() {

    //cogemos los datos del usuario que ha iniciado sesión:
    await $.ajax({url: '../Controllers/getDataUsuario.php', success: function(data){
        userDetails = JSON.parse(data);
        //guardamos en variable global
        userInfo = userDetails;
    }})
}

function add(tabSelected){
    $("#addObservacion").hide();
    $("#addReserva").hide();

    //muestra el contenido para añadir/subir observaciones/fotos
    
    if(tabSelected == "addObservacion"){
        $("#observations").hide();
        $("#add").show();
        $("#addObservacion").show();
        $(".botonAdd>p").text("Cancelar");
        $(".botonAdd>p").removeClass("text-black");
        $(".botonAdd>p").addClass("text-font-white");
        $(".botonAdd").attr("onclick", "hide('addObservacion')");
        $(".botonAdd").removeClass("button-default-color");
        $(".botonAdd").addClass("button-cancel-color");
    }
    if(tabSelected == "addReserva"){
        $("#reservas").hide();

        $("#add").show();
        $("#addReserva").show();

        $(".botonAdd>p").text("Cancelar");
        $(".botonAdd>p").removeClass("text-black");
        $(".botonAdd>p").addClass("text-font-white");
        $(".botonAdd").attr("onclick", "hide('addReserva')");
        $(".botonAdd").removeClass("button-default-color");
        $(".botonAdd").addClass("button-cancel-color");
    }
}

function hide(tabSelected) {

    //esconde el contenido para añadir/subir observaciones/fotos

    if(tabSelected == "addObservacion"){
        $("#observations").show();
        $("#add").hide();
        $(".botonAdd>p").text("Añadir observación");
        $(".botonAdd>p").removeClass("text-font-white");
        $(".botonAdd>p").addClass("text-black");
        $(".botonAdd").attr("onclick", "add('addObservacion')");
        $(".botonAdd").removeClass("button-cancel-color");
        $(".botonAdd").addClass("button-default-color");
        return;
    }
    if(tabSelected == "addReserva"){
        $("#reservas").show();
        $("#add").hide();
        $(".botonAdd>p").text("Añadir reserva");
        $(".botonAdd>p").removeClass("text-font-white");
        $(".botonAdd>p").addClass("text-black");
        $(".botonAdd").attr("onclick", "add('addReserva')");
        $(".botonAdd").removeClass("button-cancel-color");
        $(".botonAdd").addClass("button-default-color");
        return;
    }
}

function cerrarModal() {
    $(".divModal").css("display", "none");
}

function eliminarObs(idObs) {
    debugger;
    //eliminar observacion a traves de modal
    if(confirm("Estás seguro de que quieres borrar la observación?")){  
        $.post('../Controllers/eliminarObs.php',
        {idObs: idObs}
        ).done(function(data){
            console.log(data);
            if(data == 1){
                cerrarModal();
                loadObservations();
            }
        });
    }

    //cerrar modal
}

function loadCreateObs(){
    //pedimos de la bd todos los telescopios disponibles, y una lista de objetos

    //ajaxTelescopios:
    $.ajax({url: '../Controllers/getAllTelescopios.php', success: function(telescopeJSON){
        telescopeJSON = JSON.parse(telescopeJSON);        
        for (let i = 0; i < Object.keys(telescopeJSON).length; i++) {
            var inputTelescopioDiv = 
            `<div>
            <input type="radio" name="telInput" id="tel${i}" value="${telescopeJSON[i].telescope_id}">
            <label for="tel${i}">${telescopeJSON[i].fullName}; ${telescopeJSON[i].fl}mm, f${Math.floor(telescopeJSON[i].apert)}</label>
            </div>`;   
            
            $("#telescopiosListDiv").append(inputTelescopioDiv);
            
        } 
    }})


    //ajax objetos:
    $.ajax({url: '../Controllers/getAllObjects.php', success: function(objectsJSON){
        objectsJSON = JSON.parse(objectsJSON);
        for (let i = 0; i < Object.keys(objectsJSON).length; i++) {
            var optionObject = 
            `<option value="${objectsJSON[i].objeto_id}">${objectsJSON[i].name}; ${objectsJSON[i].catalog}</option>`;
            $("#objectsSelect").append(optionObject);
        } 
    }})
}

function crearObs() {

    var nombreObservacion, objetoObservacion, telescopioObs, filtrosObs = [], startDate, integracionHoras;
    
    nombreObservacion = $("#inputNombreObs").val().trim();
    objetoObservacion = $("#objectsSelect").val().trim();
    telescopioObs = $('input[name="telInput"]:checked').val();
    integracionHoras = $("#integracionNumberInput").val();

    //cogemos todos los inputs:checkbox de name="filters" y los añadimos a un array
    $('input[name="filters"]:checked').each(function() {
        filtrosObs.push(this.value);
    });
    
    // vemos si la fecha es valida
    try{
        startDate = new Date($("#startDateInput").val());
        startDate = startDate.toISOString().split('T')[0]; //convertimos fecha en yyyy-mm-dd
    } catch (RangeError) {
        $("#errMessage>small").css("color", "red");
        $("#errMessage>small").html("La fecha no es válida");
        return;
    }
    // si los campos estan vacios, no se manda la consulta
    if(isEmpty(nombreObservacion) || isEmpty(objetoObservacion) || isEmpty(telescopioObs) || filtrosObs.length == 0 || isEmpty(integracionHoras)){
        $("#errMessage>small").css("color", "red");
        $("#errMessage>small").html("Hay campos obligatorios por rellenar");
        return;
    }
    //si esta todo correcto, ajax post
    else{

        //convertimos array en string, se nos separa con comas
        filtrosObs = filtrosObs.toString();

        //objeto con todas las variables
        var dataObs = {
            name: nombreObservacion,
            target: objetoObservacion,
            telescopio: telescopioObs,
            filter: filtrosObs,
            start: startDate,
            integration: integracionHoras,
        }

        $.post('../Controllers/almacenarObs.php',
            {data: JSON.stringify(dataObs)}
        ).done(function(data){
            if(data == 1){
                alert("Observación añadida");
                loadObservations();

                $("#inputNombreObs").val("");
                $("#objectsSelect").val("");
                $('input[name="telInput"]:checked').prop('checked', false);
                $("#integracionNumberInput").val("");

            }
            else{
                console.log(data + "err");
            }

        });
    }
}

function isEmpty(value) {
    //compureba si está vacío
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}

function editUser(){
    //esta funcion se limita a cambiar los aspectos y funciones de los botones, inputs y divs

    $("#usernameField").hide();
    $("#usernameInput").show();

    $("#emailInput").prop("disabled", false);
    $("#passwordInput").prop("disabled", false);
    $("#passwordInput").attr('type', "text");    
    
    $("#editUserButton").removeClass("button-warning-color");
    $("#editUserButton").addClass("button-default-color");
    $("#editUserButton>p").html("Guardar");
    
    $("#editUserButton").attr("onclick", "pushEdit()");
    
}

function pushEdit(){
    //esta funcion hace ajax para updatear los cambios
    
    $.post('../Controllers/alterUserData.php',
    {
        user_id: userInfo[0].user_id,
        username: $("#usernameInput").val(),
        email: $("#emailInput").val(),
        password: $("#passwordInput").val(),
    }
    ).done(function(){

        $("#usernameInput").hide();
        $("#usernameField").show();

        $("#passwordInput").attr('type', "password");

        $("#editUserButton").removeClass("button-default-color");
        $("#editUserButton").addClass("button-warning-color");
        
        $("#editUserButton").attr("onclick", "editUser()");
        $("#editUserButton>p").html("Editar");

        updateData();
    })

}

async function updateData() {

    await loadUserData();

    //asignamos valores a los campos del html de Datos
    $("#usernameField").html(userInfo[0].username);
    $("#usernameInput").val(userInfo[0].username);
    $("#passwordInput").val(userInfo[0].pass);
    $("#emailInput").val(userInfo[0].email);

    $("#emailInput").prop("disabled", true);
    $("#usernameInput").hide();
    $("#passwordInput").prop("disabled", true);
}

function deleteUser(){
    if(confirm("Pulsa OK para borrar tu usuario", "")){
        $.post('../Controllers/checkUser.php',
        {
            user_id: userInfo[0].user_id,
        }
        ).done(function(data){
            if(data){
                $.ajax({
                    //delog simple
                    url: "../Controllers/deLogin.php",
                    type: "GET",
                    success: function(){
                        $("#configButton>a").html("Sign In");
                        $("#configButton>a").attr("href" , "registerPage.html");
                        $("#sessionButton>a").html("Log In");
                        $("#sessionButton>a").attr("href" , "login.html");
                    }
                })
                //borramos el usuario
                $.post('../Controllers/deleteUser.php',
                {
                    user_id: userInfo[0].user_id,
                }
                ).done(function(data){
                    if(data){
                        location.href = 'index.html'; //cuando hacemos delog, nos envía al inicio
                    }
                    else{
                        alert("Ha habido un error al borrar el usuario.")
                    }
                })
            }
            else{
                alert("Ha habido un error al comprobar el usuario.")
            }
        })
    }
}

function loadReservas() {
    $.ajax({url: '../Controllers/getUserReservas.php', success: function(response){

        resInfo = JSON.parse(response); //guardamos datos en la variable global del documento

        if (resInfo.length != 0){
            //si hay observaciones, pintamos:
            pintarReservas();
        }
        else{
            //si no, decimos que no hay
            $("#reservas").html("<p class='buttonText'>No tienes reservas hechas todavía</p>");
        }
    }})
}

function pintarReservas() {
    $("#reservas").html("");
    //mostramos reservas del usuario
    resInfo.forEach(res => {

        //por cada tipo de reserva, elegimos una clase de elemento que une a una imagen descrita en el css
        if(res.tipoReserva == 1){
            var nombreR = "Visita Guiada";
            var imTipo = "imType1"
        }
        if(res.tipoReserva == 2){
            var nombreR = "Observación";
            var imTipo = "imType2"
        }
        if(res.tipoReserva == 3){
            var nombreR = "Taller";
            var imTipo = "imType3"
        }
        
        let resRowTemplate = 
                `<div class="resCard lightgrey" id="res${res.reserva_id}">
                <div class="photoDiv ${imTipo}"></div>
                <div class="resDetails">
                    <p class="buttonText" id="resType">${nombreR}</p>
                    <p class="buttonText" id="resDate">${res.dateReservation}</p>
                    <div>
                        <div class="resDeleteBtn button-cancel-color" onclick='deleteRes(${res.reserva_id})'>
                            <p class="buttonText text-font-white">Anular</p>
                        </div>
                    </div>
                </div>`;

        $("#reservas").append(resRowTemplate);
    });
}

function selectReserva(tipo) {
    
    //cambia el boton de la actividad seleccionada
    $(`#card${tipo}>#selectReservaBtn`).removeClass("button-default-color");
    $(`#card${tipo}>#selectReservaBtn`).addClass("button-warning-color");
    $(`#card${tipo}>#selectReservaBtn`).attr("onclick", "deSelect()");
    $(`#card${tipo}>#selectReservaBtn>p`).html("Seleccionado");
    
    //deselecciona todas las demás
    for (let i = 1; i <= $("#addReserva>div").length; i++) {
        if(i != tipo){
            $(`#card${i}>#selectReservaBtn`).removeClass("button-warning-color");
            $(`#card${i}>#selectReservaBtn`).addClass("button-default-color");
            $(`#card${i}>#selectReservaBtn`).attr("onclick", `selectReserva(${i})`);
            $(`#card${i}>#selectReservaBtn>p`).html("Seleccionar");
        }
    }

    // coge el tipo de reserva que se ha escogido
    tipoReservaSeleccionada = tipo;

    //asigna valor de precio
    if(tipo == 1){
        $("#actSelectedShown").html("Visita Guiada");
        $("#precioShown").html("15€");
        precioActSeleccionada = 15;
        precReducido();
        precTotal();
        return;
    }
    if(tipo == 2){
        $("#actSelectedShown").html("Taller");
        $("#precioShown").html("40€");
        precioActSeleccionada = 40;
        precReducido();
        precTotal();
        return;
    }
    if(tipo == 3){
        $("#actSelectedShown").html("Observación");
        $("#precioShown").html("40€");
        precioActSeleccionada = 40;
        precReducido();
        precTotal();
        return;
    }
}
function deleteRes(res_id) {
    if(confirm("Pulsa OK para borrar la reserva.")){
        $.post('../Controllers/deleteRes.php',
        {
            res_id: res_id
        }
        ).done(function(data){
            if(data == 1){
                $(`#res${res_id}`).remove();
            }
            else{
                console.log(data + "err");
            }
        });
    }
    
}

function deSelect() {
    //deselecciona la actividad seleccionada de la reserva
    for (let i = 0; i <= $("#addReserva>div").length; i++) {
        $(`#card${i}>#selectReservaBtn`).removeClass("button-warning-color");
        $(`#card${i}>#selectReservaBtn`).addClass("button-default-color");
        $(`#card${i}>#selectReservaBtn`).attr("onclick", `selectReserva(${i})`);
        $(`#card${i}>#selectReservaBtn>p`).html("Seleccionar");
    }
    tipoReservaSeleccionada = null;
    precioActSeleccionada = null;
    $("#actSelectedShown").html("");
    $("#precioShown").html("");
    $("#precTotal").html("");
}

function getDate(day) {
    //selecciona el dia escogido en el calendario

    for (let i = 0; i <= 31; i++) {
        $(`li#day${i}`).removeClass("active");
    }

    dateSelected = new Date(currYear, currMonth, day+1).toISOString().split('T')[0];

    $(`li#day${day}`).addClass("active");

    $("#dateSelectedShown").html(dateSelected);
}
function precReducido() {
    //aplica tarifa reducida si se elige
    if($("#entReducida").is(":checked") && tipoReservaSeleccionada != null){
        if(tipoReservaSeleccionada == 1){
            $("#precioShown").html("10€");
            precioActSeleccionada = 10;
            precTotal();
            return;
        }
        if(tipoReservaSeleccionada == 2){
            $("#precioShown").html("30€");
            precioActSeleccionada = 30;
            precTotal();
            return;
        }
        if(tipoReservaSeleccionada == 3){
            $("#precioShown").html("30€");
            precioActSeleccionada = 30;
            precTotal();
            return;
        }
    }
    else{
        if(tipoReservaSeleccionada == 1){
            $("#precioShown").html("15€");
            precioActSeleccionada = 15;
            precTotal();
            return;
        }
        if(tipoReservaSeleccionada == 2){
            $("#precioShown").html("40€");
            precioActSeleccionada = 40;
            precTotal();
            return;
        }
        if(tipoReservaSeleccionada == 3){
            $("#precioShown").html("40€");
            precioActSeleccionada = 40;
            precTotal();
            return;
        }
    }
}
function precTotal() {
    if(precioActSeleccionada != null){
        nAsistentes = $("#numPersonas").val();
        precioTotal = precioActSeleccionada * nAsistentes;
        $("#precTotal").html(precioTotal + "€");
    }
}

function crearReserva() {
    let eFlag = false //si eFlag = true, hay campos por rellenar y la reserva no se ejecuta
    if(tipoReservaSeleccionada == null){
        alert("Debes seleccionar una actividad");
        eFlag = true;
    }
    if(dateSelected == null){
        alert("Debes seleccionar una fecha válida");
        eFlag = true;
    }
    if(!isDniValid()){
        alert("El DNI debe ser válido");
        eFlag = true;
    }
    if(isEmpty($("#nombreCompleto>input").val())){
        alert("Debe haber un nombre asociado");
        eFlag = true;
    }

    if(!eFlag){
        //si no hay errores:
        let data = {
            dateReservation: dateSelected,
            tipoReserva: tipoReservaSeleccionada,
            entReducida: $("#entReducida").is(":checked"),
            nAsistentes: nAsistentes,
            nombreCompleto: $("#nombreCompleto>input").val(),
            p_total: precioTotal
        }

        $.post('../Controllers/almacenarRes.php',
            {data: JSON.stringify(data)}
        ).done(function(data){
            if(data == 1){
                alert("Reserva añadida.");
                loadReservas();
            }
            else{
                alert("La reserva no se ha podido crear.")
                console.log(data + "err");
            }

        });
    }
}

function isDniValid(){
    const dniRegex = /^\d{8}[a-zA-Z]$/;
    let dni = $("#inputDNI>input").val()
    if (dniRegex.test(dni)){
        let dniNum = dni.substring(0,dni.length-1); //cogemos la parte de numeros
        let dniLetra = dni.substring(dni.length-1, dni.length); //cogemos la letra
        dniNum = dniNum % 23;

        var letraArr = "TRWAGMYFPDXBNJZSQVHLCKET";

        letraArr = letraArr.substring(dniNum, dniNum+1);
        return letraArr == dniLetra.toUpperCase() ? true : false;
    }
}