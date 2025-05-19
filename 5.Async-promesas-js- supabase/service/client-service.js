/*const crear_nueva_fila=(nombre,email)=>{// recepciono datos 
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
                    href="../screens/editar_cliente.html"
                    class="simple-button simple-button--edit"
                    >Editar</a
                    >
                </li>
                <li>
                    <button
                    class="simple-button simple-button--delete"
                    type="button"
                    >
                    Eliminar
                    </button>
                </li>
                </ul>
            </td>
            `;
        fila.innerHTML=contenido;
        return fila; 
};


const table = document.querySelector("[data-table]");
*/

/*const lista_clientes=()=>{ metodo antiguo
    const promesa= new Promise((resolve,reject)=>{
        const http = new XMLHttpRequest();//variable con request http y xml
        http.open("GET","http://localhost:3000/perfil");
        http.send();
        http.onload=()=>{
            const response = JSON.parse(http.response);//convierto que mi respuesta hhtp sea json
            if(http.response>=400){
                reject(response)
            } else{
                resolve(response)
            }
        };
    });
    return promesa;
}*/



/*
lista_clientes()
    .then((data)=>{
        data.forEach((perfil)=>{
            const nuevafila= crear_nueva_fila(perfil.nombre,perfil.email);
            table.appendChild(nuevafila)
        });
    })
    .catch((error)=> alert("No existe conexión"));

*/

//---------optimizado---------
/*const listaclientes=()=> fetch("http://localhost:3000/perfil").then((respuesta)=>respuesta.json());
const crearCliente=(nombre,email)=>{
    return fetch ("http://localhost:3000/perfil",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({nombre,email, id: uuid.v4()})
    });

};
const eliminarCliente=(id)=>{
    console.log("elii",id)
    return fetch(`http://localhost:3000/perfil/${id}`,{
        method:"DELETE"
    });

;}
// referencia a un cliente del json a travez de id
const clientes=(id)=>{
    return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta)=>respuesta.json())}

const actualizarCliente=(nombre,email,id)=>{ // ojoooo solo actualizo nombre y email NO ID
    return fetch(`http://localhost:3000/perfil/${id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({nombre,email})

        }).then(respuesta=>console.log(respuesta)).catch((err)=>console.log(err));
};



export const clientService={
    listaclientes,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente
};*/

//PARTE PHP

// const API_BASE_URL='http://localhost/api/conexion.php';
// const listaclientes = () => {
//     return fetch(API_BASE_URL)
//         .then(response => {
//             console.log(response); // Verifica la respuesta
//             if (!response.ok) throw new Error("Error clientes");
//             return response.json();
//         })
//         .catch(error => {
//             console.error("Error en la solicitud:", error);
//             throw error;
//         });
// };
// const crearCliente=(nombre,email)=>{
//     return fetch(API_BASE_URL,{
//         method:'POST',
//         headers:{"Content-Type":"application/json"},
//         body:JSON.stringify({nombre,email,id:uuid.v4()})
//     }).then(response=>{
//         if(!response.ok)throw new Error("error crear clientes");
//         return response.json();
//     })
// };
// const eliminarCliente=(id)=>{
//     return fetch(`${API_BASE_URL}?id=${id}`,{
//         method:"DELETE"
//     })
// }
// const clientes=(id)=>{
//     return fetch(`${API_BASE_URL}?id=${id}`).then((respuesta)=>respuesta.json())};

// const actualizarCliente=(nombre,email,id)=>{ // ojoooo solo actualizo nombre y email NO ID
//         return fetch(API_BASE_URL,
//             {
//                 method:"PUT",
//                 headers:{
//                     "Content-Type":"application/json"
//                 },
//                 body:JSON.stringify({nombre,email,id})

//             }).then(respuesta=>console.log(respuesta)).catch((err)=>console.log(err));
//     };

//     export const clientService={
//         listaclientes,
//         crearCliente,
//         eliminarCliente,
//         clientes,
//         actualizarCliente
//     };

//PARTE SUPABASE

const SUPABASE_URL = 'https://kkihuzcyhyedxbmlcant.supabase.co';  //variables de conexion
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtraWh1emN5aHllZHhibWxjYW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY5ODIsImV4cCI6MjA2MjQ1Mjk4Mn0.d3a897oIa5wJ2LP8qNSko4wbG3Th7awkf0B479Ldo4I'
const TABLE='clientes';
const API_URL=`${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS={
    'apikey':SUPABASE_KEY,
    'Authorization':`Bearer ${SUPABASE_KEY}`,
    'Content-Type':'application/json'
}
const listaclientes=()=>{                                        //funciones de llamada de res en el supabase siguiendo ese formato "Read all rows"
    return fetch(`${API_URL}?select=*`,{headers:HEADERS})
    .then(res=>{
        if(!res.ok)throw new Error('Error en listar clientes');
        return res.json();
    });
};
const crearCliente=(nombre,email)=>{                            //este se basa en el supabes en la parte de "Insert a row"
    const cliente={nombre,
        email,
        id:uuid.v4()
    };
    return fetch(API_URL,{
        method:'POST',
        headers:HEADERS,
        body:JSON.stringify(cliente)
    })
    .then(async (res)=>{
        if(!res.ok){
            const text=await res.text();                     //responde el error en texto que esta fallando
            throw new Error(text ||'Error al insertar cliente');
        }
        const text=await res.text();
        return text ? JSON.parse(text):cliente; 
    }).catch ((error)=>{
        console.error('Error al crear cliente', error);
        throw error;
    });
};
const eliminarCliente=(id)=>{                           //este se basa en el supabes en la parte de "Delete a row"
    return fetch(`${API_URL}?id=eq.${id}`,{//valor de entrada da referencia a eliminar
        method:'DELETE',
        headers:HEADERS
    }).then(res=>{
        if(!res.ok)throw new Error('Error al eliminar cliente');
        return res;
    }).catch((error)=>{
        console.error('Error al eliminar cliente', error);
        throw error;
    });
};
const clientes=(id)=>{                                   //este se basa en el supabes en la parte de "Read a row"
    return fetch(`${API_URL}?id=eq.${id}`,{headers:HEADERS})
    .then(res=>{
        if(!res.ok)throw new Error('Error al obtener cliente');
        return res.json();
    }).catch((error)=>{
        console.error('Error al obtener cliente', error);
        throw error;
    });
}
const actualizarCliente=(nombre,email,id)=>{                 //noo modificar id se basa en "Update matching rows"
    return fetch(`${API_URL}?id=eq.${id}`,{
        method:'PATCH',
        headers:{...HEADERS,'Prefer': 'return=representation'},      //esto lo saco de supabase -H "Prefer: return=minimal" 
        body:JSON.stringify({nombre,email})
    }).then(res=>{
        if(!res.ok)throw new Error('Error al actualizar cliente');
        return res.json();
    }).catch((error)=>{
        console.error('Error al actualizar cliente', error);
        throw error;
    });
}
const buscarClientes = (query) => {
    const url = `${API_URL}?or=(nombre.ilike.*${query}*,email.ilike.*${query}*)&select=*`;
    return fetch(url, { headers: HEADERS })
        .then(res => {
            if (!res.ok) throw new Error('Error al buscar clientes');
            return res.json();
        })
        .catch(error => {
            console.error('Error al buscar clientes:', error);
            throw error;
        });
};


export const clientService={
    listaclientes,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente,
    buscarClientes
};