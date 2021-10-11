
try {
    const token = localStorage.getItem('token');

    if(token){
        location.href = '../main/main.html'; 
    }  
} catch (error) {
    console.log("Token expiró");
}



let ok = popAdvertencias.firstElementChild.lastElementChild;
ok.addEventListener('click', ()=>{popAdvertencias.classList.add('displayNone');popAdvertencias.classList.remove('popAdvertencias');});

function advertenciasCrear(mensaje) {
    popAdvertencias.classList.remove('displayNone');
    popAdvertencias.classList.add('popAdvertencias');
    popAdvertencias.firstElementChild.firstElementChild.innerHTML = mensaje;  
}



let email = document.getElementById('email');
let password = document.getElementById('password');
let ingresar = document.getElementById('ingresar');

const enviarLogin = async()=>{

    const peticionIngreso = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email.value, contrasena: password.value})
    }
    
    const respuesta = await fetch('/login', peticionIngreso);
    
    if(respuesta.status == 200){
        const json = await respuesta.json();
        localStorage.setItem('token', json);
        location.href = "../main/main.html";
    }else{
        advertenciasCrear("Usuario y/o contraseña inválidas, intente de nuevo")
    }
    
}







const obtenerUsuarios = async() =>{
    try{
        const respuesta = await fetch('/usuarios/inicio', {
            method: 'GET'
        });
        const json = await respuesta.json();
        return json;

    }catch(error){
        console.log(error);
    }
}

const primerContactoAdmin = async()=>{
    try {
        const respuesta = await fetch('/usuarios/inicio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: "admin1", 
                apellido: "admin1", 
                email: "admin1", 
                contrasena: "admin1", 
                admin: "1"
            })
        });
        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}

const primerContactoNoAdmin = async()=>{
    try {
        const respuesta = await fetch('/usuarios/inicio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: "noAdmin", 
                apellido: "noAdmin", 
                email: "noAdmin", 
                contrasena: "noAdmin", 
                admin: "0"
            })
        });
        const json = await respuesta.json();
        return json;
    } catch (error) {
        console.log(error);
    }  
}









ingresar.addEventListener('click', enviarLogin);

password.addEventListener('keyup', (e)=>{
    if(e.key == 'Enter'){
        enviarLogin(); 
    }
})



//Crear nuevos usuarios



const usuariosAuxiliares = async()=>{
    let usuariosActuales = await obtenerUsuarios();

    if(usuariosActuales.length==0){
        primerContactoAdmin();
        primerContactoNoAdmin();
    }
    
} 


usuariosAuxiliares();


