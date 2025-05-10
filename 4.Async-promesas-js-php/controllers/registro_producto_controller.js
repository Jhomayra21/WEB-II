import { productService } from "../service/producto-service.js";

const formulario = document.querySelector("[data-form-producto]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre-producto]").value;
    const precio = document.querySelector("[data-precio-producto]").value;
    const descripcion = document.querySelector("[data-descripcion-producto]").value;

    productService
        .crearProducto(nombre, precio, descripcion)
        .then(() => {
            window.location.href = "../screens/registro_completado_producto.html";
        })
        .catch((error) => {
            console.log(error);
            window.location.href = "../screens/error_producto.html";
        });
});