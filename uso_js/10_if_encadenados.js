const ciudadDestino="Sucre";
const ciudadesDisponibles =new Array("Santiago","Bogota","Lima","MonteVideo");

let edadPersonal=17;
let compania=false;

if (edadPersonal >=18 || compania){


    if (ciudadDestino.indexOf(ciudadDestino) >-1){
        console.log('pasaje disponible');
    }
    else{
        console.log('ciudad no disponible');
    }
}
else{
    if(edadPersonal>=16 && ciudadDestino=="Sucre"){
        console.log('pasaje disponible');
    }
    else{
        console.log('pasajero no cumples las reglas');
    }

}

       
    
