//Verificar Token de sesión


const token = localStorage.getItem('token');

if(!token){
    location.href = 'index.html';
}

//Logout

let logout = document.getElementById('logout');

logout.addEventListener('click', ()=>{
    localStorage.removeItem('token');
    location.href = 'index.html';
});











///////////////
// Variables //
///////////////

let contContactos = document.getElementById('contactos');
let selectTodos = document.getElementById('selectTodos');
let seleccionActiva = document.getElementById('seleccionActiva');
let agregarContacto = document.getElementById('agregarContacto');
let cerrarCreacion = document.getElementById('cerrarCreacion');
let pop = document.getElementById('pop');




let nombreNuevoContacto = document.getElementById('nombreNuevoContacto');
let apellidoNuevoContacto = document.getElementById('apellidoNuevoContacto');
let emailNuevoContacto = document.getElementById('emailNuevoContacto');
let cargoNuevoContacto = document.getElementById('cargoNuevoContacto');
let direccionNuevoContacto = document.getElementById('direccionNuevoContacto');


let selectCompania = document.getElementById('selectCompania');
let selectRegion = document.getElementById('selectRegion');
let selectPais = document.getElementById('selectPais');
let selectCiudad = document.getElementById('selectCiudad');
let selectCanal = document.getElementsByClassName('selectCanal');
let cuentasCanal = document.getElementsByClassName('cuentaCanal');
let preferenciaCanal = document.getElementsByClassName('preferenciaCanal');
 
let cancelarAgregarContacto = document.getElementById('cancelarAgregarContacto');
let guardarContacto = document.getElementById('guardarContacto');
let selectInteres = document.getElementById('selectInteres');

let contCanales = document.getElementById('contCanales');
let agregarCanal = document.getElementById('agregarCanal');

let popAdvertencias = document.getElementById('popAdvertencias');

listaElim = [];












//Peticiones a la BD







const obtenerPantallaContactos = async()=>{
    try {
        const respuesta = await fetch('/contactos', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}


const obtenerNombresCompanias = async()=>{
    try {
        const respuesta = await fetch('/companias/nombres', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}


const obtenerRegiones = async()=>{
    try {
        const respuesta = await fetch('/regiones', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}

const obtenerPaisesPorRegion = async(nombreRegion)=>{
    try {
        const respuesta = await fetch(`/paises/nombreRegion?region=${nombreRegion}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}

const obtenerCiudadesPorPais = async(nombreRegion)=>{
    try {
        const respuesta = await fetch(`/ciudades/nombrePais?pais=${nombreRegion}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}


const obtenerCanales = async()=>{
    try {
        const respuesta = await fetch('/canales', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}

const enviarNuevoContacto = async()=>{
    try {
        const respuesta = await fetch('/contactos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreContacto: nombreNuevoContacto.value,
                apellido: apellidoNuevoContacto.value,
                email: emailNuevoContacto.value,
                compania: selectCompania.value,
                cargo: cargoNuevoContacto.value,
                interes: selectInteres.value,
                ciudad: selectCiudad.value
            })
        });
        const json = await respuesta.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
    }  
}

const enviarDetalle = async(contactoAct, canalAct, preferenciaAct, cuentaAct)=>{
    try {
        const respuesta = await fetch('/canales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contacto: contactoAct,
                canal: canalAct,
                preferencia: preferenciaAct,
                cuenta: cuentaAct
            })
        });

        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}















//Pagina general


const eliminarUsuarios = (nodo) =>{
    nodo.firstElementChild.innerHTML = `${listaElim.length} Seleccionados`;
}


const seccionEliminar = ()=>{
    if(!listaElim.length == 0){ 
        seleccionActiva.children[0].classList.remove('displayNone');
        seleccionActiva.children[0].classList.add('usuariosSeleccionados');
        seleccionActiva.children[1].classList.remove('displayNone');
        seleccionActiva.children[1].classList.add('btoneliminar');
        eliminarUsuarios(seleccionActiva);
    }else{
        seleccionActiva.children[0].classList.add('displayNone');
        seleccionActiva.children[0].classList.remove('usuariosSeleccionados');
        seleccionActiva.children[1].classList.add('displayNone');
        seleccionActiva.children[1].classList.remove('btoneliminar');
    }
}

const colocarContactos = async() =>{
    try{
        const contactos = await obtenerPantallaContactos();
        contContactos.innerHTML = "";
        contactos.forEach(element => {
            contContactos.innerHTML += 
                `<div class="contacto contactoInd" >
                    <div class="chkbx">
                        <input type="checkbox" id="${element.id}" name="${element.id}">
                    </div>
                    <div class="contactos letraSub"><h3 >${element.nombreContacto}</h3></div>
                    <div class="pais letraSub "><h3>${element.nombrePais}</h3></div>
                    <div class="compania letraSub"><h3>${element.nombreCompania}</h3></div>
                    <div class="cargo letraSub"><h3>${element.cargo}</h3></div>
                    <div class="canal letraSub"><h3>${element.nombreCanal}</h3></div>
                    <div class="interes letraSub "><h3>${element.interes}%</h3></div>
                    <div class="acciones letra"><img src="./imgs/menu.png" alt="menu" class="tresptos"><img src="./imgs/editar.png" alt="editar" class="displayNone"><img src="./imgs/eliminar.png" alt="eliminar" class="displayNone"></div>
                </div>`;
        });
        for (let index = 0; index < contContactos.children.length; index++) {

            let nodo = contContactos.children[index];
            let check = nodo.firstElementChild.firstElementChild;     

            check.addEventListener('click', (e)=>{
                
                nodo.classList.toggle('contactoResaltado');
                nodo.classList.toggle('contactoInd'); 
                
                if(!listaElim.includes(check.id)){
                    listaElim.push(check.id);
                }else{
                    listaElim.splice(listaElim.indexOf(check.id), 1);
                }

                if(listaElim.length == 0){
                    selectTodos.classList.remove('displayNone');
                }else{
                    selectTodos.classList.add('displayNone');
                }
                seccionEliminar();
            });  
            
            
            //Falta agregar las funcionalidades de los botones
        }
        

    }catch(error){
    }
}

colocarContactos();

selectTodos.addEventListener('click', (e)=>{
    listaContactos = e.path[3].lastElementChild.children;
    listaCheck = e.path[3].lastElementChild.children;

    console.log(e.target.checked);
    
    for (let index = 0; index < listaContactos.length; index++) {
        const element = listaContactos[index];
        element.classList.toggle('contactoResaltado');
        element.classList.toggle('contactoInd');

        listaCheck[index].firstElementChild.firstElementChild.classList.toggle('displayNone');
        
       
        if(!listaElim.includes(listaCheck[index].firstElementChild.firstElementChild.id)){
            listaElim.push(listaCheck[index].firstElementChild.firstElementChild.id);
        }else{
            listaElim.splice(listaElim.indexOf(listaCheck[index].firstElementChild.firstElementChild.id), 1);
        }       
    }
    seccionEliminar(); 

});















// Agregar contactos

const reiniciarNuevoContacto = async ()=>{
    nombreNuevoContacto.value = "";
    apellidoNuevoContacto.value = "";
    emailNuevoContacto.value = "";
    cargoNuevoContacto.value = "";
    direccionNuevoContacto.value = "";
    selectCompania.selectedIndex = 0;
    selectRegion.selectedIndex = 0;
    selectInteres.selectedIndex = 0;
    selectPais.innerHTML = '<option value=""></option>';
    selectCiudad.innerHTML = '<option value=""></option>';
    
    for (let index = 0; index < contCanales.children.length; index++) {
        const element = contCanales.children[index].children;
        element[0].lastElementChild.selectedIndex = 0;
        element[1].lastElementChild.value = "";
        element[2].lastElementChild.selectedIndex = 0;
    }
}



agregarContacto.addEventListener('click', ()=>{
    pop.classList.remove('displayNone');
    pop.classList.add('pop');

});

cerrarCreacion.addEventListener('click', ()=>{
    pop.classList.add('displayNone');
    pop.classList.remove('pop'); 
});

cancelarAgregarContacto.addEventListener('click', ()=>{
    pop.classList.add('displayNone');
    pop.classList.remove('pop');
    reiniciarNuevoContacto();
});




//Regiones, paises, ciudades , companias, canales


const colocarNombresCiudades = async() =>{
    if(!selectPais.value==""){


        const ciudades = await obtenerCiudadesPorPais(selectPais.value);
        selectCiudad.innerHTML = '<option value=""></option>';
    
        ciudades.forEach(element =>{
            selectCiudad.innerHTML += `<option value="${element.id}" class="letraInputs">${element.nombreCiudad}</option>`;
        });


    }
    else{

        selectCiudad.innerHTML = '<option value=""></option>';

    }
}


const colocarNombresPaises = async() =>{
    if (!selectRegion.value=="") {


        const paises = await obtenerPaisesPorRegion(selectRegion.value);
        selectPais.innerHTML = '<option value=""></option>';
        selectCiudad.innerHTML = '<option value=""></option>';

        paises.forEach(element =>{
            selectPais.innerHTML += `<option value="${element.id}" class="letraInputs ">${element.nombrePais}</option>`;
        });
    
        selectPais.addEventListener('change', colocarNombresCiudades);   


    }
    else{

        selectPais.innerHTML = '<option value=""></option>';
        selectCiudad.innerHTML = '<option value=""></option>';

    }
}

const colocarRegiones = async() =>{
    const regiones = await obtenerRegiones();

    regiones.forEach(element =>{
        selectRegion.innerHTML += `<option value="${element.id}" class="letraInputs ">${element.nombreRegion}</option>`;
    });

    selectRegion.addEventListener('change', colocarNombresPaises);

}


const colocarNombresCompanias = async ()=>{
    const companias = await obtenerNombresCompanias();

    companias.forEach(element=>{
        selectCompania.innerHTML += `<option value="${element.id}" class="letraInputs ">${element.nombreCompania}</option>`;
    })
}


const colocarCanales = async ()=>{
    const Canales = await obtenerCanales();
    
    for (let index = 0; selectCanal < selectCanal.length; index++) {
        const element = selectCanal[index];
        element.innerHTML = '<option value=""></option>';
    }

    Canales.forEach(element=>{

        for (let index = 0; index < selectCanal.length; index++) {
            const element2 = selectCanal[index];
            element2.innerHTML +=`<option value="${element.id}" class="letraInputs ">${element.nombreCanal}</option>`;
        }
        
    })
}


colocarCanales();
colocarRegiones();
colocarNombresCompanias();


function advertenciasCrear(mensaje) {
    popAdvertencias.classList.remove('displayNone');
    popAdvertencias.classList.add('popAdvertencias');
    popAdvertencias.firstElementChild.firstElementChild.innerHTML = mensaje;

    let ok = popAdvertencias.firstElementChild.lastElementChild;

    ok.addEventListener('click', ()=>{popAdvertencias.classList.add('displayNone');popAdvertencias.classList.remove('popAdvertencias');})
}

guardarContacto.addEventListener('click', () =>{

    listaCanales = [];
    listaCuentas = [];
    listaPreferencias = [];
    for (let index = 0; index < selectCanal.length; index++) {

        if(selectCanal[index].value === ""){
            continue;
        }
        listaCanales.push(selectCanal[index].value);
        listaCuentas.push(cuentasCanal[index].value);
        listaPreferencias.push(preferenciaCanal[index].value);

    }

    if(nombreNuevoContacto.value=="" || apellidoNuevoContacto.value=="" || emailNuevoContacto.value=="" || cargoNuevoContacto.value=="" || direccionNuevoContacto.value=="" || selectCiudad.value=="" || selectPais.value=="" || selectRegion.value=="" || selectCompania.value=="" || selectInteres.value ==""){
        advertenciasCrear("Debes llenar todos los espacion con asterisco")
    }

    

    else if(listaPreferencias.filter(pref => pref=="Canal favorito").length>1){
        advertenciasCrear("Solo puede haber un canal favorito");
    }

    else if(listaPreferencias.filter(pref => pref=="Canal favorito").length==0){
        advertenciasCrear("Debes tener al menos un canal favorito");
    }

    else if(listaPreferencias.includes("")){
        advertenciasCrear("Debes escoger la preferencia de cada canal");
    }
    else if(listaCuentas.includes("")){
        advertenciasCrear("Debes escribir la cuenta de todos tus canales");
    }

    else{
        const creacionContactoNuevo = async()=>{
            let idNuevo = await enviarNuevoContacto();
            console.log(idNuevo);
            for (let index = 0; index < listaCanales.length; index++) {
                await enviarDetalle(idNuevo[0], listaCanales[index], listaPreferencias[index], listaCuentas[index]);
            }
            
        }
        
        creacionContactoNuevo();
        colocarContactos();
        location.reload();
    }

}); 












