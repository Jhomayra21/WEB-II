import { mascotaService } from "../service/pet-service.js";

const crear_nueva_fila = (nombre, especie, raza, dueño, id) => {
    const fila = document.createElement('tr');

    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${especie}</td>
        <td>${raza}</td>
        <td>${dueño}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_pet.html?id=${id}"
                        class="simple-button simple-button--edit"
                    >Editar</a>
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

    fila.innerHTML = contenido;

    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        mascotaService.eliminarMascota(btn.id)
            .then(() => {
                alert("Mascota eliminada");
                fila.remove(); // Elimina la fila visualmente
            })
            .catch(() => alert("Error al eliminar la mascota"));
    });

    return fila;
};

const table = document.querySelector("[data-table]");
const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector(".simple-button--search");

mascotaService.listarMascotas()
    .then(data => {
        data.forEach(({ nombre, especie, raza, dueño, id }) => {
            const nuevaFila = crear_nueva_fila(nombre, especie, raza, dueño, id);
            table.appendChild(nuevaFila);
        });
    })
    .catch(error => alert("Ocurrió un error al cargar las mascotas"));
function cargarMascotas() {
    table.innerHTML = "";
    mascotaService.listarMascotas()
    .then(data => {
        data.forEach(({ nombre, especie, raza, dueño, id }) => {
        const fila = crear_nueva_fila(nombre, especie, raza, dueño, id);
        table.appendChild(fila);
        });
    })
    .catch(error => {
        console.error(error);
        alert("Error al cargar los mascotas");
    });
}
async function buscarMascota(query) {
    try {
    const resultados = await mascotaService.buscarMascota(query);
    table.innerHTML = "";
    resultados.forEach(({ nombre, especie, raza, dueño, id }) => {
        const fila = crear_nueva_fila(nombre, especie, raza, dueño, id);
        table.appendChild(fila);
    });
    } catch (error) {
        console.error(error);
        alert("Error al buscar mascotas");
    }
}
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query === "") {
        cargarMascotas();
    } else {
        buscarMascota(query);
    }
});
