var userList = [];
var obsList = [];
var objList = [];
var resList = [];

function loadCRUD_Users(){

    var menuOption = `
    <div class="menuOption" id="cr_UsersOption" onclick="tabShown('userCRUD')">
        <p class="optionTitle">Gestión Usuarios</p>
    </div>`
    
    $(".stickyDiv").append(menuOption);
    
    //cargamos todos los usuarios
    $.ajax({url: '../Controllers/getAllUsuarios.php', success: function(data){ 

        //guardamos la lista de usuarios en una variable global
        userList = JSON.parse(data);

        userList.forEach(user => {

            var x = function () {
                if(user.role == 0){
                    return 'Normal'
                }
                else{
                    return 'Admin'
                }
            }

            var userRowTemplate = 
            `<div class="userRow" id="user${user.user_id}">
                <div class="divTable">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-font-grey">ID</th>
                                <th class="text-font-grey">Nombre de usuario</th>
                                <th class="text-font-grey">Contraseña</th>
                                <th class="text-font-grey">Email</th>
                                <th class="text-font-grey">Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="tableRow_ID">${user.user_id}</td>
                                <td id="tableRow_username">${user.username}</td>
                                <td id="tableRow_pass">${user.pass}</td>
                                <td id="tableRow_email">${user.email}</td>
                                <td id="tableRow_role">${x()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="CRUD_Actions">
                    <div class="button-cancel-color" id='CRUDdeleteUserButton' onclick='CRUD_deleteUser(${user.user_id})'>
                        <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20L18.4199 20.2209C18.3074 21.2337 17.4512 22 16.4321 22H7.56786C6.54876 22 5.69264 21.2337 5.5801 20.2209L4 6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.34491 3.14716C7.67506 2.44685 8.37973 2 9.15396 2H14.846C15.6203 2 16.3249 2.44685 16.6551 3.14716L18 6H6L7.34491 3.14716Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 6H22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 11V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    <div class="button-warning-color" id='CRUDeditUserButton' onclick='CRUD_editUser(${user.user_id})'>
                        <p class="buttonText-small">Editar</p>
                    </div>
                </div>
            </div>`;

            $("#userCRUD").append(userRowTemplate);

        });
    }})
}
function loadCRUD_Observations(){
    let menuOption = `
        <div class="menuOption" id="cr_ObsOption" onclick="tabShown('obsCRUD')">
            <p class="optionTitle">Gestión Observaciones</p>
        </div>`
        
        $(".stickyDiv").append(menuOption);
        
    //datos a incluir en la row: ID, created_by(buscar username correspondiente), observe_startdate, integration, observed_object(buscar objetos.catalog)
    $.ajax({url: '../Controllers/getAllObservaciones.php', success: function(data){ 

        //guardamos la lista de usuarios en una variable global
        obsList = JSON.parse(data);

        obsList.forEach(obs => {


            let obsRowTemplate = 
            `<div class="obsRow" id="obs${obs.observacion_id}">
                <div class="divTable">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-font-grey">ID</th>
                                <th class="text-font-grey">Creado por</th>
                                <th class="text-font-grey">F. Inicio</th>
                                <th class="text-font-grey">Integr.</th>
                                <th class="text-font-grey">Objeto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="tableRow_ID">${obs.observacion_id}</td>
                                <td id="tableRow_createdBy">${obs.username}</td>
                                <td id="tableRow_startDate">${obs.observe_startdate}</td>
                                <td id="tableRow_integration">${obs.integration_totalTime}</td>
                                <td id="tableRow_object">${obs.catalog}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="CRUD_Actions">
                    <div class="button-cancel-color" id='CRUDdeleteObsButton' onclick='CRUD_deleteObs(${obs.observacion_id})'>
                        <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20L18.4199 20.2209C18.3074 21.2337 17.4512 22 16.4321 22H7.56786C6.54876 22 5.69264 21.2337 5.5801 20.2209L4 6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.34491 3.14716C7.67506 2.44685 8.37973 2 9.15396 2H14.846C15.6203 2 16.3249 2.44685 16.6551 3.14716L18 6H6L7.34491 3.14716Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 6H22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 11V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    <div class="button-warning-color" id='CRUDeditObsButton' onclick='CRUD_editObs(${obs.observacion_id})'>
                        <p class="buttonText-small">Editar</p>
                    </div>
                </div>
            </div>`;

            $("#obsCRUD").append(obsRowTemplate);

        });
    }})
}
function loadCRUD_Reservas() {
    let menuOption = `
        <div class="menuOption" id="cr_ResOption" onclick="tabShown('resCRUD')">
            <p class="optionTitle">Gestión Reservas</p>
        </div>`
        
        $(".stickyDiv").append(menuOption);

        $.ajax({url: '../Controllers/getAllReservas.php', success: function(data){ 

            //guardamos la lista de usuarios en una variable global
            resList = JSON.parse(data);
    
            resList.forEach(res => {
                var x = function () {
                    if(res.tipoReserva == 1){
                        return "Visita Guiada";
                    }
                    if(res.tipoReserva == 2){
                        return "Observación";
                    }
                    if(res.tipoReserva == 3){
                        return "Taller";
                    }
                }
                
                let resRowTemplate = 
                `<div class="resRow" id="res${res.reserva_id}">
                    <div class="divTable">
                        <table>
                            <thead>
                                <tr>
                                    <th class="text-font-grey">ID</th>
                                    <th class="text-font-grey">Usuario</th>
                                    <th class="text-font-grey">Fecha reserva</th>
                                    <th class="text-font-grey">Nombre completo</th>
                                    <th class="text-font-grey">Tipo reserva</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td id="tableRow_ID">${res.reserva_id}</td>
                                    <td id="tableRow_username">${res.username}</td>
                                    <td id="tableRow_date">${res.dateReservation}</td>
                                    <td id="tableRow_fullName">${res.fullName}</td>
                                    <td id="tableRow_tipoReserva">${x()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    
                    <div class="CRUD_Actions">
                        <div class="button-cancel-color" id='CRUDdeleteResButton' onclick='CRUD_deleteRes(${res.reserva_id})'>
                            <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20L18.4199 20.2209C18.3074 21.2337 17.4512 22 16.4321 22H7.56786C6.54876 22 5.69264 21.2337 5.5801 20.2209L4 6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.34491 3.14716C7.67506 2.44685 8.37973 2 9.15396 2H14.846C15.6203 2 16.3249 2.44685 16.6551 3.14716L18 6H6L7.34491 3.14716Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 6H22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 11V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </div>
                        <div class="button-warning-color" id='CRUDeditResButton' onclick='CRUD_editRes(${res.reserva_id})'>
                            <p class="buttonText-small">Editar</p>
                        </div>
                    </div>
                </div>`;
    
                $("#resCRUD").append(resRowTemplate);
    
            });
        }})
}

async function addCRUD(type){
    if(type == "usuario"){
        var userRowTemplate = 
            `<div class="userRow" id="userN">
                <div class="divTable">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-font-grey">ID</th>
                                <th class="text-font-grey">Nombre de usuario</th>
                                <th class="text-font-grey">Contraseña</th>
                                <th class="text-font-grey">Email</th>
                                <th class="text-font-grey">Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="tableRow_ID">--</td>
                                <td id="tableRow_username"><input type='text' class='crudInput' id='inputUsernameCRUD' value=''></td>
                                <td id="tableRow_pass"><input type='text' class='crudInput' id='inputPassCRUD' value=''></td>
                                <td id="tableRow_email"><input type='text' class='crudInput' id='inputEmailCRUD' value=''></td>
                                <td id="tableRow_role"><p>Admin: </p><input type='checkbox' id='inputRoleCRUD'></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="CRUD_Actions">
                    <div class="button-cancel-color" id='CRUDdeleteUserButton' onclick='CRUD_removeRow("userN")'>
                        <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20L18.4199 20.2209C18.3074 21.2337 17.4512 22 16.4321 22H7.56786C6.54876 22 5.69264 21.2337 5.5801 20.2209L4 6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.34491 3.14716C7.67506 2.44685 8.37973 2 9.15396 2H14.846C15.6203 2 16.3249 2.44685 16.6551 3.14716L18 6H6L7.34491 3.14716Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 6H22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 11V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    <div class="button-default-color" id='CRUDeditUserButton' onclick='CRUD_addEntry("userN")'>
                        <p class="buttonText-small">Añadir</p>
                    </div>
                </div>
            </div>`;
            $(".botonAdd").attr("onclick", "addCRUD('null')");
            $("#userCRUD").prepend(userRowTemplate);
    }

    if(type == "observacion"){
        console.log(2);

        let listTelescopiosHTML = '';
            await $.ajax({url: '../Controllers/getAllTelescopios.php', success: function(telescopeJSON){
                telescopeJSON = JSON.parse(telescopeJSON);

                telescopeJSON.forEach(telesc => {
                    listTelescopiosHTML += `<option value='${telesc.telescope_id}'>${telesc.nombreTel}</option>`
                });
                
                listTelescopiosHTML = '<select id="telescopeSelect">'+ listTelescopiosHTML +'</select>';
            }})

        let listUsuariosHTML = ''; 
            userList.forEach(u => {
                listUsuariosHTML += `<option value='${u.user_id}'>${u.username}</option>`;
            });
            listUsuariosHTML = '<select id="createdBySelect">'+ listUsuariosHTML +'</select>';

        let objListHTML = '';
            await getObjetos();
            objList.forEach(o => {
                objListHTML += `<option value='${o.objeto_id}'>${o.catalog}</option>`;
            });
            objListHTML = '<select id="objectListSelect">'+ objListHTML +'</select>';

        let date = new Date().toISOString().split('T')[0];

        var obsRowTemplate = 
            `<div class="obsRow" id="obsN">
                <div class="divTable">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-font-grey">ID</th>
                                <th class="text-font-grey">Nombre</th>
                                <th class="text-font-grey">Creado por</th>
                                <th class="text-font-grey">F. Inicio</th>
                                <th class="text-font-grey">Integr.</th>
                                <th class="text-font-grey">Objeto</th>
                                <th class="text-font-grey">Telescopio</th>
                                <th class="text-font-grey">Filtros</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="tableRow_ID">--</td>
                                <td id="tableRow_nameObs"><input type='text' id='inputNameObsCRUD' value=''></td>
                                <td id="tableRow_createdBy">${listUsuariosHTML}</td>
                                <td id="tableRow_startDate"><input type='date' class='crudInput' id='inputStartDate' value='${date}'></td>
                                <td id="tableRow_integration"><input type='number' id='inputIntegrationCRUD' value=''></td>
                                <td id="tableRow_object">${objListHTML}</td>
                                <td id="tableRow_telescope">${listTelescopiosHTML}</td>
                                <td id="tableRow_filters"><input type='text' id='inputFiltersCRUD' value=''></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="CRUD_Actions">
                    <div class="button-cancel-color" id='CRUDdeleteObsButton' onclick='CRUD_removeRow("obsN")'>
                        <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20L18.4199 20.2209C18.3074 21.2337 17.4512 22 16.4321 22H7.56786C6.54876 22 5.69264 21.2337 5.5801 20.2209L4 6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.34491 3.14716C7.67506 2.44685 8.37973 2 9.15396 2H14.846C15.6203 2 16.3249 2.44685 16.6551 3.14716L18 6H6L7.34491 3.14716Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 6H22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 11V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    <div class="button-default-color" id='CRUDdeleteObsButton' onclick='CRUD_addEntry("obsN")'>
                        <p class="buttonText-small">Añadir</p>
                    </div>
                </div>
            </div>`;
            $(".botonAdd").attr("onclick", "addCRUD('null')");
            $("#obsCRUD").prepend(obsRowTemplate);
    }
    if(type == "reserva"){
        let date = new Date().toISOString().split('T')[0];

        function getHTMLUserOption() {
            let h = '';
            userList.forEach(user => {
                //recogemos todos los usuarios en un array para luego meterlos como opciones en un select
                h += `<option value='${user.user_id}'>${user.username}</option>`
            });
            return h;
        }

        let optionSelectTipo = 
            `<select id="visitaListSelect">
                <option value='1' selected>Visita Guiada</option>
                <option value='2' selected>Observación</option>
                <option value='3' selected>Taller</option>
            </select>`;

        let resRowTemplate = 
            `<div class="resRow" id="resN">
                <div class="divTable">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-font-grey">ID</th>
                                <th class="text-font-grey">Usuario</th>
                                <th class="text-font-grey">Fecha reserva</th>
                                <th class="text-font-grey">Nombre completo</th>
                                <th class="text-font-grey">Tipo reserva</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="tableRow_ID">--</td>
                                <td id="tableRow_username"><select id="createdBySelect">${getHTMLUserOption()}</select></td>
                                <td id="tableRow_date"><input type='date' class='crudInput' id='inputResDate' value='${date}'></td>
                                <td id="tableRow_fullName"><input type='text' class='crudInput' id='inputResFullName'></td>
                                <td id="tableRow_tipoReserva">${optionSelectTipo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="CRUD_Actions">
                    <div class="button-cancel-color" id='CRUDdeleteResButton' onclick='CRUD_removeRow("obsN")'>
                        <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20L18.4199 20.2209C18.3074 21.2337 17.4512 22 16.4321 22H7.56786C6.54876 22 5.69264 21.2337 5.5801 20.2209L4 6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.34491 3.14716C7.67506 2.44685 8.37973 2 9.15396 2H14.846C15.6203 2 16.3249 2.44685 16.6551 3.14716L18 6H6L7.34491 3.14716Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 6H22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 11V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    <div class="button-warning-color" id='CRUDeditResButton' onclick='CRUD_addEntry("resN")'>
                        <p class="buttonText-small">Guardar</p>
                    </div>
                </div>
            </div>`;

        $(".botonAdd").attr("onclick", "addCRUD('null')");
        $("#resCRUD").prepend(resRowTemplate);
    }
    if(type == "null"){
        //pasa por aqui para anular la funcion del boton añadir cuando hay ya una plantilla mostrada
        alert("No es posible añadir otra entrada habiendo una plantilla de entrada mostrada")
    }
}
function CRUD_removeRow(type){
    if(type == "userN"){
        $('#userN').remove();
        $(".botonAdd").attr("onclick", "addCRUD('usuario')");
    }
    if(type == "obsN"){
        $('#obsN').remove();
        $(".botonAdd").attr("onclick", "addCRUD('observacion')");
    }
}
async function CRUD_addEntry(type) {
    if(type == "userN"){

        //comprobamos q tengan contenido los inputs:
        if( !isEmpty($(`#userN>.divTable>table>tbody>tr>td#tableRow_username>input`).val()) 
                && !isEmpty($(`#userN>.divTable>table>tbody>tr>td#tableRow_pass>input`).val()) 
                && !isEmpty($(`#userN>.divTable>table>tbody>tr>td#tableRow_email>input`).val()) 
        ){
            await $.ajax({
                url: "../Controllers/registerUser.php",
                type: "POST",
                data: {
                    username: $(`#userN>.divTable>table>tbody>tr>td#tableRow_username>input`).val(),
                    password: $(`#userN>.divTable>table>tbody>tr>td#tableRow_pass>input`).val(),
                    email: $(`#userN>.divTable>table>tbody>tr>td#tableRow_email>input`).val(),
                    role: function () {
                        //convertimos el estado del checkbox en un binario
                        if( $(`#userN>.divTable>table>tbody>tr>td#tableRow_role>input#inputRoleCRUD`).is(":checked") ){
                            return 1;
                        }
                        else{
                            return 0;
                        }    
                    },
                },
                success: function(response){
                    if(response){
                        //si el insert ha ido bien, convertimos los inputs en texto plano:
                        if($(`#userN>.divTable>table>tbody>tr>td#tableRow_role>input#inputRoleCRUD`).is(":checked")){
                            userRole = "Admin";
                        }
                        else{
                            userRole = "Normal";
                        }

                        let x = `<tr>
                                    <td id="tableRow_ID">--</td>
                                    <td id="tableRow_username">${$(`#userN>.divTable>table>tbody>tr>td#tableRow_username>input`).val()}</td>
                                    <td id="tableRow_pass">${$(`#userN>.divTable>table>tbody>tr>td#tableRow_pass>input`).val()}</td>
                                    <td id="tableRow_email">${$(`#userN>.divTable>table>tbody>tr>td#tableRow_email>input`).val()}</td>
                                    <td id="tableRow_role">${userRole}</td>
                                </tr>`
                            ;

                        //quitamos las funciones de los botones ya que no podemos guardar los datos de "userN" si quisieramos editarlos/borrarlos
                        $("#userN>.divTable>table>tbody").html(x);
                        $(`#userN>.CRUD_Actions>#CRUDeditUserButton`).attr("onclick", ``)
                        $(`#userN>.CRUD_Actions>#CRUDdeleteUserButton`).attr("onclick", ``)
                        $(`#userN>.CRUD_Actions>#CRUDeditUserButton`).html("- -")
                        $(`#userN>.CRUD_Actions>#CRUDdeleteUserButton`).html("- -")

                    }
                    else{
                        //si ha ido mal:
                        console.log(response);
                    }
                }
            });
        }
        else{
            alert("La entrada a añadir no debe estar vacía");
            return;
        }
        return;
    }
    if(type == "obsN"){

        let nombreObservacion = $(`#obsN>.divTable>table>tbody>tr>td#tableRow_nameObs>input#inputNameObsCRUD`).val();
        let integration_totalTime = $(`#obsN>.divTable>table>tbody>tr>td#tableRow_integration>input#inputIntegrationCRUD`).val();
        let filters = $(`#obsN>.divTable>table>tbody>tr>td#tableRow_filters>input#inputFiltersCRUD`).val();
        if(!isEmpty(nombreObservacion) && !isEmpty(integration_totalTime) && !isEmpty(filters)){

            
            await $.ajax({
                url: "../Controllers/createObs.php",
                type: "POST",
                data: {
                    nombreObservacion: nombreObservacion,
                    created_by: $(`#createdBySelect`).val(),
                    observe_startdate: new Date($(`#obsN>.divTable>table>tbody>tr>td#tableRow_startDate>input`).val()).toISOString().split('T')[0],
                    integration_totalTime: integration_totalTime,
                    observed_object: $(`#objectListSelect`).val(),
                    telescopeUsed: $(`#telescopeSelect`).val(),
                    filters: filters,
                },
                success: function(response) {
                    if(response){
                        let x = `<tr>
                                    <td id="tableRow_ID">--</td>
                                    <td id="tableRow_createdBy">${$(`#createdBySelect :selected`).text()}</td>
                                    <td id="tableRow_startDate">${new Date($(`#obsN>.divTable>table>tbody>tr>td#tableRow_startDate>input`).val()).toISOString().split('T')[0]}</td>
                                    <td id="tableRow_integration">${integration_totalTime}</td>
                                    <td id="tableRow_object">${$(`#objectListSelect :selected`).text()}</td>
                                </tr>`
                            ;

                        let y = `
                            <tr>
                                <th class="text-font-grey">ID</th>
                                <th class="text-font-grey">Creado por</th>
                                <th class="text-font-grey">F. Inicio</th>
                                <th class="text-font-grey">Integr.</th>
                                <th class="text-font-grey">Objeto</th>
                            </tr>`

                        //quitamos las funciones de los botones ya que no podemos guardar los datos de "userN" si quisieramos editarlos/borrarlos
                            $("#obsN>.divTable>table>thead").html(y);
                            $("#obsN>.divTable>table>tbody").html(x);
                            $(`#obsN>.CRUD_Actions>#CRUDeditUserButton`).attr("onclick", ``)
                            $(`#obsN>.CRUD_Actions>#CRUDdeleteUserButton`).attr("onclick", ``)
                            $(`#obsN>.CRUD_Actions>#CRUDeditUserButton`).html("- -")
                            $(`#obsN>.CRUD_Actions>#CRUDdeleteUserButton`).html("- -")
                    }
                    else{
                        console.log(response);
                    }

                },
            });
        }
        else{
            alert("La entrada a añadir no debe estar vacía");
            
            console.log(nombreObservacion, integration_totalTime, filters);
            return;
        }
    }
    if(type == "resN"){
        let user_id = $(`#resN>.divTable>table>tbody>tr>td#tableRow_username>select :selected`).val();
        let fechaReserva = new Date ($(`#resN>.divTable>table>tbody>tr>td#tableRow_date>input`).val()).toISOString().split('T')[0];
        let fullName = $(`#resN>.divTable>table>tbody>tr>td#tableRow_fullName>input`).val();
        let tipoReserva = $(`#resN>.divTable>table>tbody>tr>td#tableRow_tipoReserva>select :selected`).val();


        if(!isEmpty(fullName)){
            $.post('../Controllers/hacerReserva.php',
            {
                user_id: user_id,
                fechaReserva: fechaReserva,
                nombreCompleto: fullName,
                tipoVisita: tipoReserva,
            }
            ).done(function(response){
                console.log(response);
                if (response != 0) {
                    let x = 
                    `<tr>
                        <td id="tableRow_ID">--</td>
                        <td id="tableRow_username">${$(`#resN>.divTable>table>tbody>tr>td#tableRow_username>select :selected`).text()}</td>
                        <td id="tableRow_date">${fechaReserva}</td>
                        <td id="tableRow_fullName">${fullName}</td>
                        <td id="tableRow_tipoReserva">${$(`#resN>.divTable>table>tbody>tr>td#tableRow_tipoReserva>select :selected`).text()}</td>
                    </tr>`

                    $("#resN>.divTable>table>tbody").html(x);

                    $(`#resN>.CRUD_Actions>#CRUDeditResButton`).attr("onclick", ``)
                    $(`#resN>.CRUD_Actions>#CRUDdeleteResButton`).attr("onclick", ``)
                    $(`#resN>.CRUD_Actions>#CRUDeditResButton`).html("- -")
                    $(`#resN>.CRUD_Actions>#CRUDdeleteResButton`).html("- -")
                }
        
                else{
                    alert(`La fecha ${fechaReserva} ya está ocupada.`)
                }
        
            })
        }
        else{
            alert("La entrada a añadir debe estar completa");
        }


    }


}

function CRUD_editUser(id){

    //esta funcion tiene como parametro el ID de usuario, buscamos en el array de todos los usuarios aquel que coincida su ID

    let i = 0;
    userList.forEach(user => {
        //cambiamos todos los campos a que sean inputs excepto el campo ID
        if(user.user_id == id){
            let selectedUser = userList[i];

            //insertamos inputs en cada celda de la tabla:
            $(`#user${selectedUser.user_id}>.divTable>table>tbody>tr>td#tableRow_username`).html(`<input type='text' class='crudInput' id='inputUsernameCRUD' value='${selectedUser.username}'>`);
            $(`#user${selectedUser.user_id}>.divTable>table>tbody>tr>td#tableRow_email`).html(`<input type='text' class='crudInput' id='inputEmailCRUD' value='${selectedUser.email}'>`);
            $(`#user${selectedUser.user_id}>.divTable>table>tbody>tr>td#tableRow_pass`).html(`<input type='text' class='crudInput' id='inputPassCRUD' value='${selectedUser.pass}'>`);
            $(`#user${selectedUser.user_id}>.divTable>table>tbody>tr>td#tableRow_role`).html("<p>Admin: </p><input type='checkbox' id='inputRoleCRUD'>");
            
            if(selectedUser.role == '1'){
                $(`#user${selectedUser.user_id}>.divTable>table>tbody>tr>td#tableRow_role>input#inputRoleCRUD`).prop('checked', true)
            }
            else{
                $(`#user${selectedUser.user_id}>.divTable>table>tbody>tr>td#tableRow_role>input#inputRoleCRUD`).prop('checked', false)
            }
            
            
            $(`#user${selectedUser.user_id}>.CRUD_Actions>#CRUDeditUserButton>p`).html('Guardar');
            $(`#user${selectedUser.user_id}>.CRUD_Actions>#CRUDeditUserButton`).attr("onclick", `saveUserEdit(${user.user_id})`)
            return;
        }
        else
        i++;
    });

}
async function saveUserEdit(selectedUser){
    
    //cogemos los valores de los inputs
    let editUsername = $(`#user${selectedUser}>.divTable>table>tbody>tr>td#tableRow_username>input`).val();
    let editPass = $(`#user${selectedUser}>.divTable>table>tbody>tr>td#tableRow_pass>input`).val();
    let editEmail = $(`#user${selectedUser}>.divTable>table>tbody>tr>td#tableRow_email>input`).val();
    let editRole = $(`#user${selectedUser}>.divTable>table>tbody>tr>td#tableRow_role>input#inputRoleCRUD`).val();
    
    //convertimos el estado del checkbox en un 0/1:
    if( $(`#user${selectedUser}>.divTable>table>tbody>tr>td#tableRow_role>input#inputRoleCRUD`).is(":checked") ){
        editRole = 1;
    }
    else{
        editRole = 0;
    }
    
    
    await $.post('../Controllers/alterUserData.php',
        {
            user_id: selectedUser,
            username: editUsername,
            email: editEmail,
            password: editPass,
            role: editRole,
        }
        ).done(function(){
            
            $(`#user${selectedUser}>.divTable>table>tbody>tr>td#tableRow_username`).html(`${editUsername}`);
            $(`#user${selectedUser}>.divTable>table>tbody>tr>td#tableRow_email`).html(`${editEmail}`);
            $(`#user${selectedUser}>.divTable>table>tbody>tr>td#tableRow_pass`).html(`${editPass}`);
            
            if(editRole == 0){
                $(`#user${selectedUser}>.divTable>table>tbody>tr>td#tableRow_role`).html("Normal");
            }
            else{
                $(`#user${selectedUser}>.divTable>table>tbody>tr>td#tableRow_role`).html("Admin");
            }
            
            $(`#user${selectedUser}>.CRUD_Actions>#CRUDeditUserButton>p`).html('Editar');
            $(`#user${selectedUser}>.CRUD_Actions>#CRUDeditUserButton`).attr("onclick", `CRUD_editUser(${selectedUser})`)
            // updateData();
        })
}
async function CRUD_deleteUser(id){
    if(confirm("Pulsa OK para borrar el usuario.")){
        await $.post('../Controllers/deleteUser.php',
        {
            user_id: id,
        }
        ).done(function(){
            $(`#user${id}`).remove();
        })
    }
}

function CRUD_deleteObs(obs_id) {
    if(confirm("Pulsa OK para borrar la observación.")){
        $.post('../Controllers/deleteObs.php',
        {
            obs_id: obs_id,
        }
        ).done(function(){
            $(`#obs${obs_id}`).remove();
        })
    }

}
async function CRUD_editObs(obs_id) {
    let i = 0;
    await getObjetos();

    obsList.forEach(obs => {
        if(obs.observacion_id == obs_id){
            let selectedObs = obsList[i];
            let optionSelectUsuario = `<select id="createdBySelect">${getHTMLUserOption(selectedObs.username)}</select>`;
            let optionSelectObjetos = `<select id="objectListSelect">${getHTMLObjectsOption(selectedObs.catalog)}</select>`;

            //cambiamos todos los campos en cada celda de la fila a que sean inputs/selects excepto el campo ID
            $(`#obs${selectedObs.observacion_id}>.divTable>table>tbody>tr>td#tableRow_createdBy`).html(optionSelectUsuario);
            $(`#obs${selectedObs.observacion_id}>.divTable>table>tbody>tr>td#tableRow_startDate`).html(`<input type='date' class='crudInput' id='inputStartDate' value='${selectedObs.observe_startdate}'>`);
            $(`#obs${selectedObs.observacion_id}>.divTable>table>tbody>tr>td#tableRow_integration`).html(`<input type='number' id='inputIntegrationCRUD' value='${selectedObs.integration_totalTime}'>`);
            $(`#obs${selectedObs.observacion_id}>.divTable>table>tbody>tr>td#tableRow_object`).html(optionSelectObjetos);
            
            $(`#obs${selectedObs.observacion_id}>.CRUD_Actions>#CRUDeditObsButton>p`).html('Guardar');
            $(`#obs${selectedObs.observacion_id}>.CRUD_Actions>#CRUDeditObsButton`).attr("onclick", `saveObsEdit(${selectedObs.observacion_id})`)

            return;
        }
        else
        i++;
    });


    function getHTMLUserOption(user_in) {
        let h = '';
        userList.forEach(user => {
            //recogemos todos los usuarios en un array para luego meterlos como opciones en un select
            if(user.username == user_in)
                h += `<option value='${user.user_id}' selected>${user.username}</option>`
            else
                h += `<option value='${user.user_id}'>${user.username}</option>`
        });
        return h;
    }
    function getHTMLObjectsOption(object_in) {
        let h = '';

        
        objList.forEach(obj => {
            //si el objeto que viene de ajax coincide con el objeto que se está editando, 
            // se le añade `selected` para ser la opcion predeterminada
            if(obj.catalog == object_in){
                h += `<option value='${obj.objeto_id}' selected>${obj.catalog}</option>`
            }
            else{
                h += `<option value='${obj.objeto_id}'>${obj.catalog}</option>`
            }
        });
        return h;
    }
}
function saveObsEdit(obsID) {

    let newUsername = $(`#obs${obsID}>.divTable>table>tbody>tr>td#tableRow_createdBy>select :selected`).text()
    let newObject = $(`#obs${obsID}>.divTable>table>tbody>tr>td#tableRow_object>select :selected`).text()

    let editCreatedBy = $(`#obs${obsID}>.divTable>table>tbody>tr>td#tableRow_createdBy>select`).val();
    let editDate = new Date ($(`#obs${obsID}>.divTable>table>tbody>tr>td#tableRow_startDate>input`).val()).toISOString().split('T')[0];
    let editIntegration = $(`#obs${obsID}>.divTable>table>tbody>tr>td#tableRow_integration>input`).val();
    let editObject = $(`#obs${obsID}>.divTable>table>tbody>tr>td#tableRow_object>select`).val();
    $.post('../Controllers/alterObsData.php',
    {
        observacion_id: obsID,
        created_by: editCreatedBy,
        observe_startdate: editDate,
        integration: editIntegration,
        observed_object: editObject,
    }
    ).done(function(){
        $(`#obs${obsID}>.divTable>table>tbody>tr>td#tableRow_createdBy`).html(newUsername);
        $(`#obs${obsID}>.divTable>table>tbody>tr>td#tableRow_startDate`).html(editDate);
        $(`#obs${obsID}>.divTable>table>tbody>tr>td#tableRow_integration`).html(editIntegration);
        $(`#obs${obsID}>.divTable>table>tbody>tr>td#tableRow_object`).html(newObject);
        
        $(`#obs${obsID}>.CRUD_Actions>#CRUDeditObsButton>p`).html('Guardar');
        $(`#obs${obsID}>.CRUD_Actions>#CRUDeditObsButton`).attr("onclick", `CRUD_editObs(${obsID})`)

    })
}

function CRUD_deleteRes(res_id) {
    if(confirm("Pulsa OK para borrar la observación.")){
        $.post('../Controllers/deleteRes.php',
        {
            res_id: res_id,
        }
        ).done(function(){
            $(`#res${res_id}`).remove();
        })
    }

}
function CRUD_editRes(res_id) {
    let i = 0;

    resList.forEach(res => {
        if(res.reserva_id == res_id){
            let selectedRes = resList[i];
            let optionSelectUsuario = `<select id="createdBySelect">${getHTMLUserOption(selectedRes.username)}</select>`;
            let optionSelectTipo = `<select id="visitaListSelect">
                                        <option value='1' selected>Visita Guiada</option>
                                        <option value='2' selected>Observación</option>
                                        <option value='3' selected>Taller</option>
                                    </select>`;

            //cambiamos todos los campos en cada celda de la fila a que sean inputs/selects excepto el campo ID
            $(`#res${res.reserva_id}>.divTable>table>tbody>tr>td#tableRow_username`).html(optionSelectUsuario);
            $(`#res${res.reserva_id}>.divTable>table>tbody>tr>td#tableRow_date`).html(`<input type='date' class='crudInput' id='inputResDate' value='${selectedRes.dateReservation}'>`);
            $(`#res${res.reserva_id}>.divTable>table>tbody>tr>td#tableRow_fullName`).html(`<input type='text' class='crudInput' id='inputResFullName' value='${selectedRes.fullName}'>`);
            $(`#res${res.reserva_id}>.divTable>table>tbody>tr>td#tableRow_tipoReserva`).html(optionSelectTipo);
            
            $(`#res${res.reserva_id}>.CRUD_Actions>#CRUDeditResButton>p`).html('Guardar');
            $(`#res${res.reserva_id}>.CRUD_Actions>#CRUDeditResButton`).attr("onclick", `saveResEdit(${res.reserva_id})`)

            return;
        }
        else
        i++;
    });


    function getHTMLUserOption(user_in) {
        let h = '';
        userList.forEach(user => {
            //recogemos todos los usuarios en un array para luego meterlos como opciones en un select
            if(user.username == user_in)
                h += `<option value='${user.user_id}' selected>${user.username}</option>`
            else
                h += `<option value='${user.user_id}'>${user.username}</option>`
        });
        return h;
    }
}
function saveResEdit(res_id) {

    let newUsername = $(`#res${res_id}>.divTable>table>tbody>tr>td#tableRow_username>select :selected`).val();
    let editDate = new Date ($(`#res${res_id}>.divTable>table>tbody>tr>td#tableRow_date>input`).val()).toISOString().split('T')[0];
    let editFullName = $(`#res${res_id}>.divTable>table>tbody>tr>td#tableRow_fullName>input`).val();
    let editTipoReserva = $(`#res${res_id}>.divTable>table>tbody>tr>td#tableRow_tipoReserva>select`).val();

    
    $.post('../Controllers/alterResData.php',
    {
        reserva_id: res_id,
        user_id: newUsername,
        dateReservation: editDate,
        fullName: editFullName,
        tipoReserva: editTipoReserva,
    }
    ).done(function(response){
        if (response) {
            $(`#res${res_id}>.divTable>table>tbody>tr>td#tableRow_username`).html($(`#res${res_id}>.divTable>table>tbody>tr>td#tableRow_username>select :selected`).text());
            $(`#res${res_id}>.divTable>table>tbody>tr>td#tableRow_date`).html(editDate);
            $(`#res${res_id}>.divTable>table>tbody>tr>td#tableRow_fullName`).html(editFullName);
            $(`#res${res_id}>.divTable>table>tbody>tr>td#tableRow_tipoReserva`).html($(`#res${res_id}>.divTable>table>tbody>tr>td#tableRow_tipoReserva>select :selected`).text());
            
            $(`#res${res_id}>.CRUD_Actions>#CRUDeditResButton>p`).html('Editar');
            $(`#res${res_id}>.CRUD_Actions>#CRUDeditResButton`).attr("onclick", `CRUD_editRes(${res_id})`)
        }

        else{
            console.log(response);
        }

    })
}

async function getObjetos() {
    await $.ajax({
        url: '../Controllers/getAllObjects.php', success: function (objectsJSON) {
            objList = JSON.parse(objectsJSON);
        }
    });
}

function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}