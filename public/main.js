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
let selectCompania = document.getElementById('selectCompania');
let selectRegion = document.getElementById('selectRegion');
let selectPais = document.getElementById('selectPais');
let selectCiudad = document.getElementById('selectCiudad');
let selectCanal = document.getElementById('selectCanal');

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

const obtenerCiudadesPorPais = async(nombrePais)=>{
    try {
        const respuesta = await fetch(`/ciudades/nombrePais?pais=${nombrePais}`, {
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

agregarContacto.addEventListener('click', ()=>{
    pop.classList.remove('displayNone');
    pop.classList.add('pop');
})

cerrarCreacion.addEventListener('click', ()=>{
    pop.classList.add('displayNone');
    pop.classList.remove('pop'); 
})


//Regiones, paises, ciudades , companias, canales


const colocarNombresCiudades = async() =>{
    const ciudades = await obtenerCiudadesPorPais(selectPais.value);
    selectCiudad.innerHTML = '<option value=""></option>';

    ciudades.forEach(element =>{
        selectCiudad.innerHTML += `<option value="${element.nombreCiudad}" class="letraInputs">${element.nombreCiudad}</option>`;
    })
}


const colocarNombresPaises = async() =>{
    const paises = await obtenerPaisesPorRegion(selectRegion.value);
    selectPais.innerHTML = '<option value=""></option>';
    selectCiudad.innerHTML = '<option value=""></option>';

    paises.forEach(element =>{
        selectPais.innerHTML += `<option value="${element.nombrePais}" class="letraInputs ">${element.nombrePais}</option>`;
    });

    selectPais.addEventListener('change', colocarNombresCiudades);
}

const colocarRegiones = async() =>{
    const regiones = await obtenerRegiones();

    regiones.forEach(element =>{
        selectRegion.innerHTML += `<option value="${element.nombreRegion}" class="letraInputs ">${element.nombreRegion}</option>`;
    });

    selectRegion.addEventListener('change', colocarNombresPaises);

}


const colocarNombresCompanias = async ()=>{
    const companias = await obtenerNombresCompanias();

    companias.forEach(element=>{
        selectCompania.innerHTML += `<option value="${element.nombreCompania}" class="letraInputs ">${element.nombreCompania}</option>`;
    })
}


const colocarCanales = async ()=>{
    const Canales = await obtenerCanales();

    Canales.forEach(element=>{
        selectCanal.innerHTML += `<option value="${element.nombreCanal}" class="letraInputs ">${element.nombreCanal}</option>`;
    })
}

colocarCanales();
colocarRegiones();
colocarNombresCompanias();


