var obsInfo = [];

$(function(){
    tabShown("data");
    loadUserData();
    loadObservations();
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
        $(".boton>p").html("Añadir foto");
        $(".boton").attr("onclick", "add('addFoto')");

        
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
        $(".boton>p").html("Añadir observación");
        $(".boton").attr("onclick", "add('addObservacion')");
        
        
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
                                <div class="targetData"><p class="subTitle">${obsInfo[i].targetName}</p></div>
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
                            <p class="createdDate">${obsInfo[idCard].created_at}</p>
                        </div>
                        <div class="obsStartDiv">
                            <p class="obsStartLabel">Observacion comenzada el:</p>
                            <p class="obsStartDate">${obsInfo[idCard].observe_startdate}</p>
                        </div>
                        <div class="obsTimeDiv">
                            <p class="obsTimeLabel">Tiempo de observación total:</p>
                            <p class="obsTimeDate">${obsInfo[idCard].integration_totalTime}h</p>
                        </div>
                    </div>
                </div>
                <div id="generalDetailsDiv">
                    <div class="flex center">
                        <p id="tituloObsLabel" class="title text-center">${obsInfo[idCard].nombreObservacion}</p>
                    </div>
                    <div id="targetDetails">
                        <div class="flex space-between">
                            <p class="labelText">Objeto: </p>
                            <p class="targetName labelText">${obsInfo[idCard].name}</p>
                        </div>
                        <div>
                            <p id="coordsLabel" class="text-center contentText">RA: ${obsInfo[idCard].coord_RA} , DEC: ${obsInfo[idCard].coord_DEC}</p>
                            <p id="catalogLabel" class="text-center contentText">Catalogo: ${obsInfo[idCard].catalog}</p>
                        </div>
                    </div>
                    <div id="telescopioDetails">
                        <div class="flex space-between">
                            <p class="labelText">Telescopio:</p>
                            <p id="telescopeName" class="labelText">${obsInfo[idCard].nombreTel}</p>
                        </div>
                        <div>
                            <div class="flex center">
                                <p class="text-center contentText">Nombre: </p>
                                <p id="fullNomTelescope" class="text-center contentText">${obsInfo[idCard].fullName}</p>
                            </div>
                            <div class="flex center">
                                <p class="text-center contentText">Focal: </p>
                                <p id="focalTelescope"class="text-center contentText">${obsInfo[idCard].fl}mm</p>
                            </div>
                            <div class="flex center">
                                <p class="text-center contentText">Apertura: </p>
                                <p id="apertureTelescope" class="text-center contentText">${obsInfo[idCard].apert}</p>
                            </div>
                        </div>
                    </div>
                    <div id="filtroDetails">
                        <p class="filtroLabel labelText">Filtros:</p>
                        <div id="usedFilters">
                            <p>L: 00h</p>
                            <p>RGB: 00h</p>
                            <p>Oiii: 00h</p>
                            <p>Ha: 00h</p>
                            <p>Sii: 00h</p>
                        </div>
                    </div>
                    <div class="flex space-between">
                        <p class="labelText">Progreso:</p>
                        <p id="progresoPorcentaje" class="labelText">${obsInfo[idCard].progress}%</p>
                    </div>
                </div>
            </div>
            <div id="eliminarBotonDiv">
                <div id="botonCerrarObs" onclick="cerrarModal()">
                    <p class="text-center buttonText text-black">Cerrar</p>
                </div>
                <div id="botonEliminarObs" class="button-cancel-color" onclick="eliminarObs(${obsInfo[idCard].observacion_id})">
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
        $(".boton>p").text("Cancelar");
        $(".boton>p").removeClass("text-black");
        $(".boton>p").addClass("text-font-white");
        $(".boton").attr("onclick", "hide('addObservacion')");
        $(".boton").removeClass("button-default-color");
        $(".boton").addClass("button-cancel-color");
    }
    else if(tabSelected == "addFoto"){
    }
}
function hide(tabSelected) {

    //esconde el contenido para añadir/subir observaciones/fotos

    if(tabSelected == "addObservacion"){
        $("#observations").show();
        $("#add").hide();
        $(".boton>p").text("Añadir observación");
        $(".boton>p").removeClass("text-font-white");
        $(".boton>p").addClass("text-black");
        $(".boton").attr("onclick", "add('addObservacion')");
        $(".boton").removeClass("button-cancel-color");
        $(".boton").addClass("button-default-color");
    }
    else if(tabSelected == "addFoto"){
    }
}

function cerrarModal() {
    $(".divModal").css("display", "none");
}
function eliminarObs(idObs) {
    //eliminar observacion a traves de modal
    alert("estas seguro de que quieres borrar la obs?")
    //cerrar modal
    cerrarModal();
}