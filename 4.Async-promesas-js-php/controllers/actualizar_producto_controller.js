import { productService } from "../service/producto-service.js";

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (!id) {
        window.location.href = "../screens/error_producto.html";
    }
    const nombre = document.querySelector("[data-nombre-producto]");
    const precio = document.querySelector("[data-precio-producto]");
    const descripcion = document.querySelector("[data-descripcion-producto]");

    try {
        const producto = await productService.obtenerProducto(id);
        if (producto.nombre && producto.precio && producto.descripcion) {
            nombre.value = producto.nombre;
            precio.value = producto.precio;
            descripcion.value = producto.descripcion;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log("Error:", error);
        window.location.href = "../screens/error_producto.html";
    }
};

obtenerInfo();

const formulario = document.querySelector("[data-form-producto]");
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector("[data-nombre-producto]").value;
    const precio = document.querySelector("[data-precio-producto]").value;
    const descripcion = document.querySelector("[data-descripcion-producto]").value;

    productService
        .actualizarProducto(nombre, precio, descripcion, id)
        .then(() => {
            window.location.href = "../screens/edicion_concluida_producto.html";
        })
        .catch((error) => {
            console.log(error);
            window.location.href = "../screens/error_producto.html";
        });
});