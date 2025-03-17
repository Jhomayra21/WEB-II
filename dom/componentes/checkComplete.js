const checkComplete=()=>{
    const i = document.createElement('i');                          //creacion de un icono
    i.classList.add("far","fa-check-square","icon");           //dar estilo al icono
    i.addEventListener("click",color);                              //llamar a la funcion color
    return i;
}

// const color =(evento)=>{
//     const element = evento.target;                                   //target devuelve informacion
//     element.classList.add('fas');                                    //es un estilo de esto "far","fa-check-square icon","icon"
//     element.classList.remove('completeIcon');                           // aqui era add
//     element.classList.remove('far');
// }
const color =(evento)=>{
    const element = evento.target; 
    if (element.classList.contains('fas')) {
        element.classList.remove('fas');
        element.classList.add('far');
    } else {
        element.classList.add('fas');
        element.classList.remove('far');
    }
}


export default checkComplete;                                          //para que exporte y se pueda llamar desde el otro java 


