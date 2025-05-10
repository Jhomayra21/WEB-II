// const listarProductos = () => fetch("http://localhost:3000/productos").then((respuesta) => respuesta.json());

//     const crearProducto = (nombre, precio, descripcion) => {
//         return fetch("http://localhost:3000/productos", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ nombre, precio, descripcion, id: uuid.v4() })
//         });
//     };

//     const eliminarProducto = (id) => {
//         return fetch(`http://localhost:3000/productos/${id}`, {
//             method: "DELETE"
//         });
//     };

//     const obtenerProducto = (id) => {
//         return fetch(`http://localhost:3000/productos/${id}`).then((respuesta) => respuesta.json());
//     };

//     const actualizarProducto = (nombre, precio, descripcion, id) => {
//         return fetch(`http://localhost:3000/productos/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ nombre, precio, descripcion })
//         }).then((respuesta) => respuesta).catch((err) => console.log(err));
//     };

//     export const productService = {
//         listarProductos,
//         crearProducto,
//         eliminarProducto,
//         obtenerProducto,
//         actualizarProducto
//     };

//parte php 
const API_PRODUCTOS_URL = 'http://localhost/api/producto.php';

const listarProductos = () => {
    return fetch(API_PRODUCTOS_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener productos");
            return response.json();
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            throw error;
        });
};

const crearProducto = (nombre, precio, descripcion) => {
    return fetch(API_PRODUCTOS_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: uuid.v4(), nombre, precio, descripcion })
    }).then(response => {
        if (!response.ok) throw new Error("Error al crear producto");
        return response.json();
    });
};

const eliminarProducto = (id) => {
    return fetch(`${API_PRODUCTOS_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) throw new Error("Error al eliminar producto");
        return response.json();
    });
};

const obtenerProducto = (id) => {
    return fetch(`${API_PRODUCTOS_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener producto");
            return response.json();
        });
};

const actualizarProducto = (nombre, precio, descripcion,id) => {
    return fetch(API_PRODUCTOS_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, precio, descripcion,id })
    }).then(response => {
        if (!response.ok) throw new Error("Error al actualizar producto");
        return response.json();
    }).catch(err => console.log(err));
};

export const productService = {
    listarProductos,
    crearProducto,
    eliminarProducto,
    obtenerProducto,
    actualizarProducto
};


