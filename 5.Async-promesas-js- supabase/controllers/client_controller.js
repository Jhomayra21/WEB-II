import {clientService} from "../service/client-service.js"
const crear_nueva_fila=(nombre,email,id)=>{// recepciono datos 
    const fila = document.createElement('tr');// creo una nueva filla en la tabla
    //guardo html en una variable y tambien llamo a mis datos de entrada
    const contenido = `
            <td class="td" data-td>
            ${nombre}
            </td>
            <td>${email}</td>
            <td>
            <ul class="table__button-control">
                <li>
                    <a
                    href="../screens/editar_cliente.html?id=${id}"
                    class="simple-button simple-button--edit"
                    >Editar</a
                    >
                </li>
                <li>
                    <button
                    class="simple-button simple-button--delete"
                    type="button" id="${id}">
                    Eliminar
                    </button>
                </li>
                </ul>
            </td>
            `;
        fila.innerHTML=contenido;
        const btn =fila.querySelector("button")
        btn.addEventListener("click",()=>{
            const id=btn.id;
            clientService.eliminarCliente(id).then(respuesta=>{
                alert("eliminado")
            }).catch(error=> alert("error"))

        })

        return fila; 
};
// --------- inicial echo en clases ------------
/*
const table = document.querySelector("[data-table]");
clientService.listaclientes()
    .then((data)=>{
    data.forEach((perfil)=>{ 
        const nuevafila=crear_nueva_fila(perfil.nombre,perfil.email,perfil.id) // para eliminar y actualizar agregamos id
        table.appendChild(nuevafila)
    });
}).catch((error)=>alert("error"));
*/



// _----------- mejorado codigo ordenado limpio--------------
const table = document.querySelector("[data-table]");
const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector(".simple-button--search");

clientService.listaclientes()
    .then(data => {
        data.forEach(({ nombre,email,id }) => {
            const nuevaFila = crear_nueva_fila(nombre,email,id);
            table.appendChild(nuevaFila);
        });
    })
    .catch(error => alert("Ocurrio un error al cargar los clientes"));

function cargarClientes() {
    table.innerHTML = "";
    clientService.listaclientes()
    .then(data => {
        data.forEach(({ nombre, email, id }) => {
        const fila = crear_nueva_fila(nombre, email, id);
        table.appendChild(fila);
        });
    })
    .catch(error => {
        console.error(error);
        alert("Error al cargar los clientes");
    });
}
async function buscarClientes(query) {
    try {
    const resultados = await clientService.buscarClientes(query);
    table.innerHTML = "";
    resultados.forEach(({ nombre, email, id }) => {
        const fila = crear_nueva_fila(nombre, email, id);
        table.appendChild(fila);
    });
    } catch (error) {
        console.error(error);
        alert("Error al buscar clientes");
    }
}
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query === "") {
        cargarClientes();
    } else {
        buscarClientes(query);
    }
});

