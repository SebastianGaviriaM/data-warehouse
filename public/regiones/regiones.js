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



//Variables 

let contRegiones = document.getElementById('contRegiones');


let popConfirmaciones = document.getElementById('popConfirmaciones');
let cancelarEliminacion = popConfirmaciones.firstElementChild.lastElementChild.firstElementChild;
let eliminar = popConfirmaciones.firstElementChild.lastElementChild.lastElementChild;


let popAdvertencias = document.getElementById('popAdvertencias');


let popCreacion = document.getElementById('popCreacion');
let cancelarCreacion = popCreacion.firstElementChild.lastElementChild.firstElementChild;
let crearNuevo = popCreacion.firstElementChild.lastElementChild.lastElementChild;
let inputCreacion = popCreacion.firstElementChild.firstElementChild.lastElementChild;
let tituloCreacion = popCreacion.firstElementChild.firstElementChild.firstElementChild;



let idActual;
let idReferenciaPadre;
let tipoDeObjeto;
let accion;



let paginaUsuarios = document.getElementById('paginaUsuarios');




//Verificar admin


const tipoUsuario = async()=>{
    try {
        const respuesta = await fetch('/token', {
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




const verificarUsuario = async() =>{

    let usuario = await tipoUsuario()


    console.log(usuario);

    if(!usuario.admin){
        paginaUsuarios.classList.add('displayNone');
        paginaUsuarios.classList.remove('apartadoMenu');
    }
    else{
        console.log("Si es");
    }

}



verificarUsuario();




const obtenerRegiones = async()=>{
    try {
        const respuesta = await fetch(`/regiones`, {
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

const paisesPorRegion = async(idRegion)=>{
    try {
        const respuesta = await fetch(`/paises/nombreRegion?region=${idRegion}`, {
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

const ciudadesPorPais = async(idPais)=>{
    try{
        const respuesta = await fetch(`/ciudades/nombrePais?pais=${idPais}`, {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await respuesta.json();
        return json
    } catch(error) {
        console.log(error);
    }
}

const crearRegion = async(nombre)=>{
    try{
        const respuesta = await fetch('/regiones', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreRegion: nombre
            })
        });
        const json = await respuesta.json();
        return json;

    }catch(error){
        console.log(error);
    }
}

const crearPais = async(nombre, idPadre)=>{
    try{
        const respuesta = await fetch('/paises', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombrePais: nombre,
                region: idPadre
            })
        });
        const json = await respuesta.json();
        return json;

    }catch(error){
        console.log(error);
    }
}

const crearCiudad = async(nombre, idPadre)=>{
    try{
        const respuesta = await fetch('/ciudades', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreCiudad: nombre,
                pais: idPadre
            })
        });
        const json = await respuesta.json();
        return json;

    }catch(error){
        console.log(error);
    }
}


const borrarRegion = async(idSelect)=>{
    try {
        const respuesta = await fetch(`/regiones?id=${idSelect}`, {
            method: 'DELETE',
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
const borrarPais = async(idSelect)=>{
    try {
        const respuesta = await fetch(`/paises?id=${idSelect}`, {
            method: 'DELETE',
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
const borrarCiudad = async(idSelect)=>{
    try {
        const respuesta = await fetch(`/ciudades?id=${idSelect}`, {
            method: 'DELETE',
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

const putRegion = async(id)=>{
    try {
        const respuesta = await fetch(`/regiones?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreRegion: inputCreacion.value
            })
        });
        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}
const putPais = async(id)=>{
    try {
        const respuesta = await fetch(`/paises?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombrePais: inputCreacion.value
            })
        });
        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}
const putCiudad = async(id)=>{
    try {
        const respuesta = await fetch(`/ciudades?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreCiudad: inputCreacion.value
            })
        });
        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}





//Colocar regiones, paises y ciudades




const colocarRegiones = async() =>{
    contRegiones.innerHTML = '<li class="anadirRegion"><h3>Añadir nueva Región</h3></li>';

    contRegiones.firstElementChild.addEventListener('click', ()=>{
        popCreacion.classList.toggle('popCrear');
        popCreacion.classList.toggle('displayNone');
        tituloCreacion.innerHTML = "Nombre de la nueva Región";
        tipoDeObjeto = "region";
        accion = "crear";
        popCreacion.firstElementChild.lastElementChild.lastElementChild.value = "Crear";
    });                                                           //Anadir nueva region     

    let regionesAImprimir =  await obtenerRegiones();

    for (let index = 0; index < regionesAImprimir.length; index++) {
        const elementRegion = regionesAImprimir[index];

        let regionActual = document.createElement('li');
        regionActual.classList.add('region');
        regionActual.innerHTML = `<div><h3>${elementRegion.nombreRegion}</h3> <div><img src="../imgs/editar.png" alt="${elementRegion.id}"><img src="../imgs/eliminar.png" alt="${elementRegion.id}"></div></div><ul class="paises"><li class="anadirPais"><h4>Añadir nuevo País</h4></li></ul>`;

        regionActual.lastElementChild.firstElementChild.addEventListener('click', ()=>{
            popCreacion.classList.toggle('popCrear');
            popCreacion.classList.toggle('displayNone');
            tituloCreacion.innerHTML = "Nombre del nuevo Pais";
            tipoDeObjeto = "pais";
            idReferenciaPadre = elementRegion.id;
            accion = "crear";
            popCreacion.firstElementChild.lastElementChild.lastElementChild.value = "Crear";
        })


        regionActual.firstElementChild.addEventListener('click', ()=>{          // Activar la region
            regionActual.classList.toggle('regionActiva');
        });

        regionActual.firstElementChild.lastElementChild.lastElementChild.addEventListener('click', (e)=>{       // Eliminar Region
            popConfirmaciones.classList.toggle('displayNone');
            popConfirmaciones.classList.toggle('popConfirmaciones');
            popConfirmaciones.firstElementChild.firstElementChild.innerHTML = "Si eliminas esta región eliminarás sus países y ciudades asociados, además, los contactos y compañias asociados a estos, ¿Estás seguro de que quieres continuar?";
            

            idActual = e.target.alt;
            tipoDeObjeto = "region";
            
   
            e.stopPropagation();
        });

        regionActual.firstElementChild.lastElementChild.firstElementChild.addEventListener('click', (e)=>{       // Editar Region
            
            idActual = e.target.alt;
            tipoDeObjeto = "region";
            accion = "actualizar";

            popCreacion.classList.toggle('popCrear');
            popCreacion.classList.toggle('displayNone');
            popCreacion.firstElementChild.lastElementChild.lastElementChild.value = "Actualizar";
            tituloCreacion.innerHTML = "Nombre región";
            e.stopPropagation();
        });
        

        let paisesParaRegion = await paisesPorRegion(elementRegion.id);

        for (let index = 0; index < paisesParaRegion.length; index++) {
            const elementPais = paisesParaRegion[index];


            let paisActual = document.createElement('li');
            paisActual.classList.add('pais');
            paisActual.innerHTML = `<div><h4>${elementPais.nombrePais}</h4> <div><img src="../imgs/editar.png" alt="${elementPais.id}"><img src="../imgs/eliminar.png" alt="${elementPais.id}"></div></div><ul class="ciudades"><li class="anadirCiudad"><h4>Añadir nueva ciudad</h4></li></ul>`;

            paisActual.lastElementChild.firstElementChild.addEventListener('click', ()=>{
                popCreacion.classList.toggle('popCrear');                                               //Crear nueva ciudad
                popCreacion.classList.toggle('displayNone');
                tituloCreacion.innerHTML = "Nombre de la nueva ciudad";
                tipoDeObjeto = "ciudad";
                idReferenciaPadre = elementPais.id;
                accion = "crear";
                popCreacion.firstElementChild.lastElementChild.lastElementChild.value = "Crear";
            })



            paisActual.firstElementChild.addEventListener('click', ()=>{          // Activar el pais
                paisActual.classList.toggle('paisActivo');
            });


            paisActual.firstElementChild.lastElementChild.lastElementChild.addEventListener('click', (e)=>{     //eliminar Pais
                popConfirmaciones.classList.toggle('displayNone');
                popConfirmaciones.classList.toggle('popConfirmaciones');
                popConfirmaciones.firstElementChild.firstElementChild.innerHTML = "Si eliminas este país eliminarás las ciudades asociadas, además, los contactos y compañias asociados a estas, ¿Estás seguro de que quieres continuar?";

                idActual = e.target.alt;
                tipoDeObjeto = "pais";

                e.stopPropagation();
            });

            paisActual.firstElementChild.lastElementChild.firstElementChild.addEventListener('click', (e)=>{    //Editar Pais
                idActual = e.target.alt;
                tipoDeObjeto = "pais";
                accion = "actualizar";

                popCreacion.classList.toggle('popCrear');
                popCreacion.classList.toggle('displayNone');
                popCreacion.firstElementChild.lastElementChild.lastElementChild.value = "Actualizar";
                tituloCreacion.innerHTML = "Nombre Pais";

                e.stopPropagation();
            });


            let ciudadesParaPais = await ciudadesPorPais(elementPais.id);

            for (let index = 0; index < ciudadesParaPais.length; index++) {
                const elementCiudad = ciudadesParaPais[index];

                let ciudadActual = document.createElement('li');
                ciudadActual.classList.add('ciudad');

                ciudadActual.innerHTML = `<p>${elementCiudad.nombreCiudad}</p> <div><img src="../imgs/editar.png" alt="${elementCiudad.id}"><img src="../imgs/eliminar.png" alt="${elementCiudad.id}"></div>`;


                ciudadActual.lastElementChild.lastElementChild.addEventListener('click', (e)=>{      //Eliminar ciudad
                    popConfirmaciones.classList.toggle('displayNone');
                    popConfirmaciones.classList.toggle('popConfirmaciones');
                    popConfirmaciones.firstElementChild.firstElementChild.innerHTML = "Si eliminas esta ciudad eliminarás los contactos y compañias asociados a esta, ¿Estás seguro de que quieres continuar?";

                    idActual = e.target.alt;
                    tipoDeObjeto = "ciudad";

                    e.stopPropagation();
                });

                ciudadActual.lastElementChild.firstElementChild.addEventListener('click', (e)=>{      //editar ciudad
                    idActual = e.target.alt;
                    tipoDeObjeto = "ciudad"; 
                    accion = "actualizar";

                    popCreacion.classList.toggle('popCrear');
                    popCreacion.classList.toggle('displayNone');
                    popCreacion.firstElementChild.lastElementChild.lastElementChild.value = "Actualizar";
                    tituloCreacion.innerHTML = "Nombre ciudad";
                    e.stopPropagation();
                });

                paisActual.lastElementChild.appendChild(ciudadActual);

            }

            regionActual.lastElementChild.appendChild(paisActual);
        }
        
        contRegiones.appendChild(regionActual);
    }  
    
}



//Eliminar y pops


let ok = popAdvertencias.firstElementChild.lastElementChild;
ok.addEventListener('click', ()=>{popAdvertencias.classList.add('displayNone');popAdvertencias.classList.remove('popAdvertencias');});

function advertenciasCrear(mensaje) {
    popAdvertencias.classList.remove('displayNone');
    popAdvertencias.classList.add('popAdvertencias');
    popAdvertencias.firstElementChild.firstElementChild.innerHTML = mensaje;  
}









cancelarEliminacion.addEventListener('click', ()=>{
    popConfirmaciones.classList.toggle('displayNone');
    popConfirmaciones.classList.toggle('popConfirmaciones');
});




eliminar.addEventListener('click',(e)=>{
    if(tipoDeObjeto=="region"){
        borrarRegion(idActual);
        location.reload();
    }
    else if(tipoDeObjeto=="pais"){
        borrarPais(idActual);
        location.reload();
    }
    else if(tipoDeObjeto=="ciudad"){
        borrarCiudad(idActual);
        location.reload();
    }                                   //Falta eliminar
});





//Pop creacion


cancelarCreacion.addEventListener('click', ()=>{
    popCreacion.classList.toggle('popCrear');
    popCreacion.classList.toggle('displayNone');
});


crearNuevo.addEventListener('click', ()=>{
    if(inputCreacion.value==""){
        advertenciasCrear("Debes ingresar un nombre");
    }
    else{
        if(accion=="crear"){
            if(tipoDeObjeto=="region"){
                crearRegion(inputCreacion.value);
                location.reload();
            }
            else if(tipoDeObjeto=="pais"){
                crearPais(inputCreacion.value, idReferenciaPadre);
                location.reload();
            }
            else if(tipoDeObjeto=="ciudad"){
                crearCiudad(inputCreacion.value, idReferenciaPadre);
                location.reload();
            }
        }
        else{
            if(tipoDeObjeto=="region"){
                putRegion(idActual);
                location.reload();
            }
            else if(tipoDeObjeto=="pais"){
                putPais(idActual);
                location.reload();
            }
            else if(tipoDeObjeto=="ciudad"){
                putCiudad(idActual);
                location.reload();
            }
        }
        
    }
});


colocarRegiones();







