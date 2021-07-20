const token = localStorage.getItem('token');

if(!token){
    location.href = 'index.html';
}

let logout = document.getElementById('logout');

logout.addEventListener('click', ()=>{
    localStorage.removeItem('token');
    location.href = 'index.html';
});



const buscarUsuario = async()=>{
    try {
        const respuesta = await fetch('/token', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await respuesta.json();
        console.log(json.nombre);
        
    } catch (error) {
        console.log(error);
    }
    
}

buscarUsuario();
