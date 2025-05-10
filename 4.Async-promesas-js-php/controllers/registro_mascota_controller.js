import { mascotaService } from "../service/pet-service.js";

const formulario = document.querySelector("[data-form-mascota]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre-mascota]").value;
    const especie = document.querySelector("[data-especie-mascota]").value;
    const raza = document.querySelector("[data-raza-mascota]").value;
    const dueño = document.querySelector("[data-dueño-mascota]").value;

    mascotaService
        .crearMascota(nombre, especie, raza, dueño)
        .then(() => {
            window.location.href = "../screens/registro_completado_mascota.html";
        })
        .catch((error) => {
            console.log(error);
            window.location.href = "../screens/error_pets.html";
        });
});
