//Verificar Token de sesión


const token = localStorage.getItem('token');

if(!token){
    location.href = '../index.html';
}

//Logout

let logout = document.getElementById('logout');

logout.addEventListener('click', ()=>{
    localStorage.removeItem('token');
    location.href = '../index.html';
});




//variables

let contCompanias = document.getElementById('contCompanias');

let popCreacion = document.getElementById('popCreacion');
let inputNombre = document.getElementById('inputNombre');
let inputEmail = document.getElementById('inputEmail');
let inputTelefono = document.getElementById('inputTelefono');
let inputDireccion = document.getElementById('inputDireccion');
let ciudadCompania = document.getElementById('ciudadCompania');

let popAdvertencias = document.getElementById('popAdvertencias');



let cancelarCreacion = popCreacion.firstElementChild.lastElementChild.firstElementChild;
let CrearCompania = popCreacion.firstElementChild.lastElementChild.lastElementChild;






const todasCompanias = async() =>{
    try{
        const respuesta = await fetch('/companias', {
            method: 'GET',
            headers: {
               'Authorization': 'Bearer ' + token
           }

        });
        const json = await respuesta.json();
        return json;

    } catch (error){
        console.log(error);
    }
}

const traerCiudades = async() =>{
    try{
        const respuesta = await fetch('/ciudades', {
            method: 'GET',
            headers: {
               'Authorization': 'Bearer ' + token
           }

        });
        const json = await respuesta.json();
        return json;

    } catch (error){
        console.log(error);
    }
}


const crearCompania = async(nombreComp, telComp, emailComp, direccionComp, ciudadComp)=>{
    try{
        const respuesta = await fetch('/companias', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreCompania: nombreComp,
                telefono: telComp, 
                email: emailComp, 
                direccion: direccionComp, 
                ciudad: ciudadComp
            })
        });
        const json = await respuesta.json();
        return json;

    }catch(error){
        console.log(error);
    }
}









const colocarCompanias = async()=>{

    contCompanias.innerHTML = '<div class="division titCompanias"><h4>Nombre</h4><h4>Email</h4><h4 class="telefonoComp">Teléfono</h4><h4 class="ciudadComp">Ciudad</h4><h4>Dirección</h4><h4 class="accionesComp">Acciones</h4></div><div class="division agregarCompanias" id="agregarCompanias">Agregar nueva compañia</div>';
    let agregarCompanias = document.getElementById('agregarCompanias');

    agregarCompanias.addEventListener('click', ()=>{
        popCreacion.classList.toggle('popCrear');                                               //Crear nueva ciudad
        popCreacion.classList.toggle('displayNone');
    });


    const companias = await todasCompanias();

    for (let index = 0; index < companias.length; index++) {
        const element = companias[index];
        let companiaActual = document.createElement('div');
        companiaActual.classList.add('companiaInd');
        companiaActual.classList.add('division');

        companiaActual.innerHTML = `
            <p>${element.nombreCompania}</p>
            <p>${element.email}</p>
            <p class="telefonoComp">${element.telefono}</p> 
            <p class="ciudadComp">${element.nombreCiudad}</p>
            <p>${element.direccion}</p>
            <div class="accionesComp"><img src="../imgs/menu.png" alt="${element.id}"><img src="../imgs/editar.png" alt="${element.id}"><img src="../imgs/eliminar.png" alt="${element.id}"></div>`;

        contCompanias.insertBefore(companiaActual, agregarCompanias);
                
    }

    
}


// Pops



const colocarCiudades = async()=>{
    let ciudades = await traerCiudades();

    for (let index = 0; index < ciudades.length; index++) {
        const element = ciudades[index];
        ciudadCompania.innerHTML += `<option value="${element.id}">${element.nombreCiudad}</option>`;
    }
}

colocarCiudades();





let ok = popAdvertencias.firstElementChild.lastElementChild;
ok.addEventListener('click', ()=>{popAdvertencias.classList.add('displayNone');popAdvertencias.classList.remove('popAdvertencias');});

function advertenciasCrear(mensaje) {
    popAdvertencias.classList.remove('displayNone');
    popAdvertencias.classList.add('popAdvertencias');
    popAdvertencias.firstElementChild.firstElementChild.innerHTML = mensaje;  
}

cancelarCreacion.addEventListener('click', ()=>{
    popCreacion.classList.toggle('popCrear');                                        
    popCreacion.classList.toggle('displayNone');
    inputNombre.value="";
    inputEmail.value="";
    inputTelefono.value="";
    inputDireccion.value="";
    ciudadCompania.value=0;
});

CrearCompania.addEventListener('click', ()=>{
    if(inputNombre.value==""|inputEmail.value==""|inputTelefono.value==""|inputDireccion.value==""|ciudadCompania.value==0){
        advertenciasCrear("Debes llenar todos los campos")
    }
    else{
        crearCompania(inputNombre.value, inputTelefono.value, inputEmail.value, inputDireccion.value, ciudadCompania.value);
        location.reload();
    }
});


colocarCompanias();
