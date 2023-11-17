var obsInfo = [];

$(function(){
    tabShown("data");
    loadUserData();
    loadObservations();
    loadCreateObs();
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
        $("#data").show();
        $("#dataOption").css("text-decoration", "underline");
        $(".divBotonAdd").hide();

        
        $("#photos").hide();
        $("#photosOption").css("text-decoration", "none");
        $("#publications").hide();
        $("#publicOption").css("text-decoration", "none");
        $("#observations").hide();
        $("#obsOption").css("text-decoration", "none");
    }
    if (idTab == "photos"){
        $("#photos").show();
        $("#photosOption").css("text-decoration", "underline");
        
        $(".divBotonAdd").show();
        $(".botonAdd>p").html("Añadir foto");
        $(".botonAdd").attr("onclick", "add('addFoto')");

        
        $("#data").hide();
        $("#dataOption").css("text-decoration", "none");
        $("#publications").hide();
        $("#publicOption").css("text-decoration", "none");
        $("#observations").hide();
        $("#obsOption").css("text-decoration", "none");
    }
    if (idTab == "observations"){
        $("#observations").show();
        $("#obsOption").css("text-decoration", "underline");
        $(".divBotonAdd").show();
        $(".botonAdd>p").html("Añadir observación");
        $(".botonAdd").attr("onclick", "add('addObservacion')");
        
        
        $("#data").hide();
        $("#dataOption").css("text-decoration", "none");
        $("#photos").hide();
        $("#photosOption").css("text-decoration", "none");
        $("#publications").hide();
        $("#publicOption").css("text-decoration", "none");
    }
    if (idTab == "publications"){
        $("#publications").show();
        $("#publicOption").css("text-decoration", "underline");
        
        $("#data").hide();
        $("#dataOption").css("text-decoration", "none");
        $("#photos").hide();
        $("#photosOption").css("text-decoration", "none");
        $("#observations").hide();
        $("#obsOption").css("text-decoration", "none");
    }1
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
                                <div class="telTitle"><p class="subTitle">Telescope:</p></div>
                                <div class="telData"><p class="subTitle">${obsInfo[i].nombreTel}</p></div>
                            </div>
                            <div class="filtersDiv">
                                <div class="filtersTitle"><p class="subTitle">Filters:</p></div>
                                <div class="filtersData"><p class="subTitle">${obsInfo[i].filters}</p></div>
                            </div>
                            <div class="startDiv">
                                <div class="startTitle"><p class="subTitle">Start:</p></div>
                                <div class="startDate"><p class="subTitle">${obsInfo[i].observe_startdate}</p></div>
                            </div>
                            <div class="integrationDiv">
                                <div class="integrationTitle"><p class="subTitle">Total time:</p></div>
                                <div class="integrationTime"><p class="subTitle">${obsInfo[i].integration_totalTime}h</p></div>
                            </div>
                            <div class="progressDiv">
                                <div class="progressTitle"><p class="subTitle">Progress:</p></div>
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
                            <p class="obsStartLabel">Observacion comenzada el:</p>
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
                    <div class="flex space-between">
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

function loadUserData() {
    $.ajax({url: '../Controllers/getDataUsuario.php', success: function(userDetails){
        userDetails = JSON.parse(userDetails);

        $("#usernameField").html(userDetails[0].username);
        $("#passwordInput").val(userDetails[0].pass);
        $("#emailInput").val(userDetails[0].email);

    }})
}

function add(tabSelected){

    //muestra el contenido para añadir/subir observaciones/fotos
    
    if(tabSelected == "addObservacion"){
        $("#observations").hide();
        $("#add").show();
        $(".botonAdd>p").text("Cancelar");
        $(".botonAdd>p").removeClass("text-black");
        $(".botonAdd>p").addClass("text-font-white");
        $(".botonAdd").attr("onclick", "hide('addObservacion')");
        $(".botonAdd").removeClass("button-default-color");
        $(".botonAdd").addClass("button-cancel-color");
    }
    else if(tabSelected == "addFoto"){
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
    }
    else if(tabSelected == "addFoto"){
    }
}

function cerrarModal() {
    $(".divModal").css("display", "none");
}
function eliminarObs(idObs) {
    //eliminar observacion a traves de modal
    if(confirm("Estás seguro de que quieres borrar la observación?")){  
        $.post('../Controllers/eliminarObs.php',
        {idObs: idObs}
        ).done(function(data){

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
    if(isEmpty(nombreObservacion) || isEmpty(objetoObservacion) || isEmpty(telescopioObs) || filtrosObs.length == 0){
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
                console.log("registro añadido");
                loadObservations()
            }

        });
    }
}

function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}