try {
    const token = localStorage.getItem('token');

    if(token){
        location.href = 'main.html'; 
    }  
} catch (error) {
    console.log("Token expiró");
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
        location.href = "main.html";
    }else{
        console.log("error, no se puede pasar ");
    }
    
}


ingresar.addEventListener('click', enviarLogin);

password.addEventListener('keyup', (e)=>{
    if(e.key == 'Enter'){
        enviarLogin(); 
    }
})