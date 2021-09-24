

crearNuevaOpcion = (tipo, nombre)=>{
    let opcion = document.createElement('p');
    opcion.classList.add("opcionBusqueda");
    
    opcion.innerHTML = `<span>${tipo}</span>-<span>${nombre}</span>`;
    opcion.addEventListener('click', ()=>{

        colocarContactos(tipo, nombre);

        busqueda.classList.remove('busquedaActiva');
        busqueda.classList.add('busquedaNoActiva');
    });
    opcionesBusqueda.appendChild(opcion);
   
}



cajonBusqueda.addEventListener('keyup', async(e)=>{
    listaOpciones = [];
    console.log(e.key);
    if(cajonBusqueda.value==""){
        opcionesBusqueda.innerHTML = "";
        busqueda.classList.remove('busquedaActiva');
        busqueda.classList.add('busquedaNoActiva');
        if(e.key=="Enter"){
            location.reload();
        }
    }
    else{
        busqueda.classList.add('busquedaActiva');
        busqueda.classList.remove('busquedaNoActiva');
        regiones = await obtenerRegionesBusqueda(cajonBusqueda.value);
        paises = await obtenerPaisesBusqueda(cajonBusqueda.value);
        ciudades = await obtenerCiudadesBusqueda(cajonBusqueda.value);
        companias = await obtenerCompaniasBusqueda(cajonBusqueda.value);
        nombreContactos = await obtenerNombreContactosBusqueda(cajonBusqueda.value);
        apellidoContactos = await obtenerApellidoContactosBusqueda(cajonBusqueda.value);
        emailContactos = await obtenerEmailContactosBusqueda(cajonBusqueda.value);
        cargoContactos = await obtenerCargoContactosBusqueda(cajonBusqueda.value);
        listaOpciones.push(regiones);
        listaOpciones.push(paises); 
        listaOpciones.push(ciudades); 
        listaOpciones.push(companias); 
        listaOpciones.push(nombreContactos); 
        listaOpciones.push(apellidoContactos); 
        listaOpciones.push(emailContactos); 
        listaOpciones.push(cargoContactos); 

        opcionesBusqueda.innerHTML = "";

        for (let index = 0; index < listaOpciones.length; index++) {
            const listaCaso = listaOpciones[index];
            if(index==0){
                listaCaso.forEach(element => {
                    crearNuevaOpcion("Region", element.nombreRegion);
                });
            }
            else if(index==1){
                listaCaso.forEach(element => {
                    crearNuevaOpcion("Pais", element.nombrePais);
                });
            }
            else if(index==2){
                listaCaso.forEach(element => {
                    crearNuevaOpcion("Ciudad", element.nombreCiudad);
                });
            }
            else if(index==3){
                listaCaso.forEach(element => {
                    crearNuevaOpcion("Compania", element.nombreCompania);
                });
            }
            else if(index==4){
                listaCaso.forEach(element => {
                    crearNuevaOpcion("Nombre", element.nombreContacto);
                });
            }
            else if(index==5){
                listaCaso.forEach(element => {
                    crearNuevaOpcion("Apellido", element.apellido);
                });
            }
            else if(index==6){
                listaCaso.forEach(element => {
                    crearNuevaOpcion("Email", element.email);
                });
            }
            else if(index==7){
                listaCaso.forEach(element => {
                    crearNuevaOpcion("Cargo", element.cargo);
                });
            }


            
        }
    }
});

