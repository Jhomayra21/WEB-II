import { clientService } from "../service/client-service.js";
const formulario = document.querySelector("[data-form]")
//
/*const obtenerInfo=()=>{
    const url = new URL(window.location);
    const id = (url.searchParams.get('id'));
    if(id==null){
        window.location.href="../screens/error.html"
    }
    const nombre =document.querySelector("[data-nombre]")
    const email = document.querySelector("[data-email]")

clientService.clientes(id).then((perfil)=>{
    nombre.value=perfil.nombre;
    email.value=perfil.email;
});
    
};

obtenerInfo();
*/
//obtener informacion con async
//----------------- Nuevo Obtener Info ------------- con async
const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "../screens/error.html";
        return;
    }
    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");
    try {
        const perfilArray = await clientService.clientes(id);
        const perfil = perfilArray[0];
        if (perfil && perfil.nombre && perfil.email) {
            nombre.value = perfil.nombre;
            email.value = perfil.email;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log("Catch error", error);
        window.location.href = "../screens/error.html";
    }
};
obtenerInfo();
//-----------------------------------------
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const url = new URL(window.location)
    const id =(url.searchParams.get("id"));

    const nombre= document.querySelector('[data-nombre]').value;
    const email= document.querySelector('[data-email]').value;
    clientService.actualizarCliente(nombre,email,id).then(()=>{
        window.location.href="../screens/edicion_concluida.html";
    });
})