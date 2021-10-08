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


let popAdvertencias = document.getElementById('popAdvertencias');



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


const colocarUsuarios = async() => {

    contUsuarios.innerHTML = '<div class="division titCompanias"><h4>Nombre</h4><h4>Apellido</h4><h4 class="emailUsuario">Email</h4><h4 class="perfilUsuario">Perfil</h4><h4 class="accionesUsuario">Acciones</h4></div>';

    const usuarios = await obtenerUsuarios();

    for (let index = 0; index < usuarios.length; index++) {
        const element = usuarios[index];
        let admin = "Básico"
        
        if(element.admin){
            admin = "Admin";
        }

        contUsuarios.innerHTML += 
        `<div class="division usuarioInd">
            <p>${element.nombre}</p>
            <p>${element.apellido}</p>
            <p class="emailUsuario">${element.email}</p> 
            <p class="perfilUsuario">${admin}</p>
            <div class="accionesUsuario"><img src="../imgs/menu.png" alt="editar"><img src="../imgs/editar.png" alt="${element.id}"><img src="../imgs/eliminar.png" alt="${element.id}"></div>
         </div>`;

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
