    const boton = document.getElementById('btnModo')
    const link = document.getElementById('head__link'); 
    const nav = document.getElementById('head__nav');
    const elemento = document.getElementById('elemento');  
    const mensaje = document.getElementById('mensaje__item'); 
    const nosotros = document.getElementById('nosotros');
    const producto = document.getElementById('card');
    const contacto = document.getElementById('contacto');
    const footer = document.getElementById('footer ');
    

    //elemento.style.backgroundColor('#ffffff');

    boton.addEventListener('click', () =>{
        if (elemento.style.backgroundColor==='rgb(255,255,255,255'){
            elemento.style.backgroundColor='black';
            boton.textContent('modo claro')
        }
        else{
            elemento.style.backgroundColor='#ffffff'
        }
    });
    



    
