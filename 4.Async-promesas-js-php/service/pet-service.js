const API_MASCOTAS_URL = 'http://localhost/api/mascotas.php';

const listarMascotas = () => {
    return fetch(API_MASCOTAS_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener mascotas");
            return response.json();
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            throw error;
        });
};

const crearMascota = (nombre, especie, raza, dueño) => {
    return fetch(API_MASCOTAS_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: uuid.v4(), nombre, especie, raza, dueño })
    }).then(response => {
        if (!response.ok) throw new Error("Error al crear mascota");
        return response.json();
    });
};

const eliminarMascota = (id) => {
    return fetch(`${API_MASCOTAS_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) throw new Error("Error al eliminar mascota");
        return response.json();
    });
};

const obtenerMascota = (id) => {
    return fetch(`${API_MASCOTAS_URL}?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener mascota");
            return response.json();
        });
};

const actualizarMascota = (nombre, especie, raza, dueño, id) => {
    return fetch(API_MASCOTAS_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, especie, raza, dueño, id })
    }).then(response => {
        if (!response.ok) throw new Error("Error al actualizar mascota");
        return response.json();
    }).catch(err => console.log(err));
};

export const mascotaService = {
    listarMascotas,
    crearMascota,
    eliminarMascota,
    obtenerMascota,
    actualizarMascota
};
