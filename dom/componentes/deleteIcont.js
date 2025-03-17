const deletIcon = ()=>{
    const i = document.createElement('i');
    i.classList.add('fas','fa-trash-alt','trashIcon','icon');
    i.addEventListener('click',eliminarTArea);
    return i;

}

const eliminarTArea =(evento)=>{
    const parent =evento.target.parentElement;
    parent.remove();
    
}
export default deletIcon;