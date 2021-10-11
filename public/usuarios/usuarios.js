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




// Variables

let contUsuarios = document.getElementById('contUsuarios');

    //variables creacion de usuario

let inputNombre = document.getElementById('inputNombre');
let inputApellido = document.getElementById('inputApellido');
let inputEmail = document.getElementById('inputEmail');
let selectAdmin = document.getElementById('selectAdmin');
let inputContrasena = document.getElementById('inputContrasena');
let inputRepContrasena = document.getElementById('inputRepContrasena');
let crearUsuario = document.getElementById('crearUsuario');


    //variables Pops


let popAdvertencias = document.getElementById('popAdvertencias');
let popCreacion = document.getElementById('popCreacion');
let cancelarCreacion = document.getElementById('cancelarCreacion');
let edicion = document.getElementById('edicion');

let popConfirmaciones = document.getElementById('popConfirmaciones');
let cancelarEliminacion = popConfirmaciones.firstElementChild.lastElementChild.firstElementChild;
let eliminar = popConfirmaciones.firstElementChild.lastElementChild.lastElementChild;


let inputNombrePop = document.getElementById('inputNombrePop');
let inputApellidoPop = document.getElementById('inputApellidoPop');
let inputEmailPop = document.getElementById('inputEmailPop');
let inputPerfilPop = document.getElementById('inputPerfilPop');
let inputContrasenaPop = document.getElementById('inputContrasenaPop');
let inputRepContrasenaPop = document.getElementById('inputRepContrasenaPop');


let idTurno; 


// Llamados a BD


const obtenerUsuarios = async() =>{
    try{
        const respuesta = await fetch('/usuarios', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }

        });
        const json = await respuesta.json();
        return json;

    }catch(error){
        console.log(error);
    }
}


const enviarNuevoUsuario = async(nombreUs, apellidoUs, emailUs, contrasenaUs, adminUs)=>{
    try {
        const respuesta = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombreUs,
                apellido: apellidoUs,
                email: emailUs,
                contrasena: contrasenaUs,
                admin: adminUs
            })
        });
        const json = await respuesta.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
    }  
}

const putUsuario = async(id)=>{
    try {
        const respuesta = await fetch(`/usuarios?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: inputNombrePop.value,
                apellido: inputApellidoPop.value,
                email: inputEmailPop.value,
                contrasena: inputContrasenaPop.value,
                admin: parseInt(inputPerfilPop.value)
            })
        });
        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}

const borrarUsuario = async(idSelect)=>{
    try {
        const respuesta = await fetch(`/usuarios?id=${idSelect}`, {
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








const colocarUsuarios = async() => {

    contUsuarios.innerHTML = '<div class="division titCompanias"><h4>Nombre</h4><h4>Apellido</h4><h4 class="emailUsuario">Email</h4><h4 class="perfilUsuario">Perfil</h4><h4 class="accionesUsuario">Acciones</h4></div>';

    const usuarios = await obtenerUsuarios();

    for (let index = 0; index < usuarios.length; index++) {
        const element = usuarios[index];
        let admin = "Básico";
        if(element.admin){
            admin = "Admin";
        }

        contUsuarios.innerHTML += 
        `<div class="division usuarioInd">
            <p>${element.nombre}</p>
            <p>${element.apellido}</p>
            <p class="emailUsuario">${element.email}</p> 
            <p class="perfilUsuario">${admin}</p>
            <div class="accionesUsuario"><img src="../imgs/menu.png" alt="${element.id}"><img src="../imgs/editar.png" alt="${element.id}"><img src="../imgs/eliminar.png" alt="${element.id}"></div>
         </div>`;

    }

    for (let index = 1; index < contUsuarios.children.length; index++) {
        const element = contUsuarios.children[index];
        let btnEditar = element.lastElementChild.children[1];


        element.lastElementChild.children[2].addEventListener('click', (e)=>{
            popConfirmaciones.classList.toggle('displayNone');
            popConfirmaciones.classList.toggle('popConfirmaciones');
            popConfirmaciones.firstElementChild.firstElementChild.innerHTML = "¿Estás seguro de que quieres eliminar este usuario?";

            idTurno = e.target.alt;
        });

        btnEditar.addEventListener('click',()=>{
            popCreacion.classList.add('popCrear');
            popCreacion.classList.remove('displayNone');

            idTurno = parseInt(btnEditar.alt);

            inputNombrePop.value = element.children[0].innerHTML;
            inputApellidoPop.value = element.children[1].innerHTML;
            inputEmailPop.value = element.children[2].innerHTML;
            if(element.children[3].innerHTML=="Admin"){
                inputPerfilPop.value = 1;
            }
            else{
                inputPerfilPop.value = 0;
            }
        });

    }

}


colocarUsuarios();




let ok = popAdvertencias.firstElementChild.lastElementChild;
ok.addEventListener('click', ()=>{popAdvertencias.classList.add('displayNone');popAdvertencias.classList.remove('popAdvertencias');});

function advertenciasCrear(mensaje) {
    popAdvertencias.classList.remove('displayNone');
    popAdvertencias.classList.add('popAdvertencias');
    popAdvertencias.firstElementChild.firstElementChild.innerHTML = mensaje;  
}

const enviarUsuario = async()=>{
    if(inputNombre.value==""|inputApellido.value==""|inputEmail.value==""|selectAdmin.value==2|inputContrasena.value==""|inputRepContrasena.value==""){
        advertenciasCrear("Llena todos los espacios para crear un nuevo usuario");
    }
    else if(!(inputContrasena.value==inputRepContrasena.value)){
        advertenciasCrear("Las dos contraseñas no coinciden");
    }
    else{
        enviarNuevoUsuario(inputNombre.value, inputApellido.value, inputEmail.value, inputContrasena.value, selectAdmin.value); 
        
        location.reload();
    }
}


crearUsuario.addEventListener('click', enviarUsuario);



cancelarCreacion.addEventListener('click', ()=>{
    popCreacion.classList.remove('popCrear');
    popCreacion.classList.add('displayNone');


    for (let index = 0; index < 6; index++) {
        const element = popCreacion.firstElementChild.children[index].lastElementChild;
        if(index==3){
            element.value = 2;
        }
        else{
            element.value = "";
        }
    }
});


edicion.addEventListener('click', ()=>{

    if(inputNombrePop.value == ""| inputApellidoPop.value == "" | inputEmailPop.value == "" | inputPerfilPop.value == 2 | inputContrasenaPop.value == "" | inputRepContrasenaPop.value == ""){
        advertenciasCrear("Llena todos los espacios para editar el usuario");
    }
    else if(inputContrasenaPop.value != inputRepContrasenaPop.value){
        advertenciasCrear("Las contraseñas no coinciden");
    }
    else{
        putUsuario(idTurno);

        location.reload();
    }
});


// Pop eliminar


cancelarEliminacion.addEventListener('click', ()=>{
    popConfirmaciones.classList.toggle('displayNone');
    popConfirmaciones.classList.toggle('popConfirmaciones');
});




eliminar.addEventListener('click', async(e)=>{
    let admins = []
    totalUsuarios = await obtenerUsuarios();
    console.log(totalUsuarios);
    totalUsuarios.forEach(element => {if(element.admin){admins.push(element)}});

    if (admins.length==1){
        advertenciasCrear("No puedes eliminarlo, pues es el último usuario administrador que queda");
    }
    else{
        borrarUsuario(idTurno);
        location.href = '../index.html';
    }
});