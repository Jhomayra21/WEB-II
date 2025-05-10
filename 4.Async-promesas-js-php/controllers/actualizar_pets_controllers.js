import { mascotaService } from "../service/pet-service.js";

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (!id) {
        window.location.href = "../screens/error_pets.html";
    }
    const nombre = document.querySelector("[data-nombre-mascota]");
    const especie = document.querySelector("[data-especie-mascota]");
    const raza = document.querySelector("[data-raza-mascota]");
    const dueño = document.querySelector("[data-dueño-mascota]");

    try {
        const mascota = await mascotaService.obtenerMascota(id);
        if (mascota.nombre && mascota.especie && mascota.raza && mascota.dueño) {
            nombre.value = mascota.nombre;
            especie.value = mascota.especie;
            raza.value = mascota.raza;
            dueño.value = mascota.dueño;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log("Error:", error);
        window.location.href = "../screens/error_pets.html";
    }
};

obtenerInfo();

const formulario = document.querySelector("[data-form-mascota]");
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector("[data-nombre-mascota]").value;
    const especie = document.querySelector("[data-especie-mascota]").value;
    const raza = document.querySelector("[data-raza-mascota]").value;
    const dueño = document.querySelector("[data-dueño-mascota]").value;

    mascotaService
        .actualizarMascota(nombre, especie, raza, dueño, id)
        .then(() => {
            window.location.href = "../screens/edicion_concluida_mascota.html";
        })
        .catch((error) => {
            console.log(error);
            window.location.href = "../screens/error_pets.html";
        });
});
