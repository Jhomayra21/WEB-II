import checkComplete from "./componentes/checkComplete.js";
import deletIcon from "./componentes/deleteIcont.js";

(()=>{
const btn = document.querySelector('[data-form-btn]');               //llama a un data 
//console.log(btn);

const createTask=(evento)=>{         

    evento.preventDefault();
    const input=document.querySelector('[data-form-input]');
    //console.log(input.value);                                        //este data nos sirve para recuperar el texto de mi input
    const value = input.value;
    const list = document.querySelector('[data-list]');
    const task = document.createElement('li');                       //crea un nuevo elemento dependiendo donde el programador quiera
    task.classList.add('card');                                      //que elemento va a crear
    input.value ='';

    // const contenido = `<div>
    //             <i class="far fa-check-square icon"></i>
    //             <span class="task">${value}</span>
    //         </div>
    //         <i class="fas fa-trash-alt trashIcon icon"></i>
    //         `

    const contTask = document.createElement('div');
    
    const titleTask = document.createElement('span');

    titleTask.classList.add('task');                                 //poner nombre de una clase al nuevo elemento
    titleTask.innerText = value;
    contTask.appendChild(checkComplete());                           //agregar un check a un div 
    contTask.appendChild(titleTask);
    const content = `<i class="fas fa-trash-alt trashIcon icon"></i>`


    task.appendChild(contTask);                                     // las funciones se llaman aqui 
    task.appendChild(deletIcon());
    //task.innerHTML=contenido;
    list.appendChild(task);
    //console.log(content);
}

btn.addEventListener('click',createTask);

/*const checkComplete=()=>{
    const i = document.createElement('i');                          //creacion de un icono
    i.classList.add("far","fa-check-square","icon");           //dar estilo al icono
    i.addEventListener("click",color);                              //llamar a la funcion color
    return i;
}

const color =(evento)=>{
    const element = evento.target;                                   //target devuelve informacion
    element.classList.add('fas');                                    //es un estilo de esto "far","fa-check-square icon","icon"
    element.classList.add('completeIcon');
    element.classList.remove('far');
}*/

/*const deletIcon = ()=>{
    const i = document.createElement('i');
    i.classList.add('fas','fa-trash-alt','trashIcon','icon');
    i.addEventListener('click',eliminarTArea);
    return i;

}

const eliminarTArea =(evento)=>{
    const parent =evento.target.parentElement;
    parent.remove();
    
}*/


})();