// PARTE SUPABASE
const SUPABASE_URL = 'https://kkihuzcyhyedxbmlcant.supabase.co';  //variables de conexion
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtraWh1emN5aHllZHhibWxjYW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY5ODIsImV4cCI6MjA2MjQ1Mjk4Mn0.d3a897oIa5wJ2LP8qNSko4wbG3Th7awkf0B479Ldo4I'
const TABLE='mascotas';
const API_URL=`${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS={
    'apikey':SUPABASE_KEY,
    'Authorization':`Bearer ${SUPABASE_KEY}`,
    'Content-Type':'application/json'
}
const listarMascotas = () => {
    return fetch(`${API_URL}?select=*`, { headers: HEADERS })
        .then(res => {
            if (!res.ok) throw new Error('Error en listar mascotas');
            return res.json();
        });
};

const crearMascota = (nombre, especie, raza, dueño) => {
    const mascota = {
        id: uuid.v4(), // Generates a varchar UUID
        nombre,
        especie,
        raza,
        dueño // Foreign key referencing clientes(id)
    };
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(mascota)
    })
        .then(async (res) => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Error al insertar mascota');
            }
            const text = await res.text();
            return text ? JSON.parse(text) : mascota;
        }).catch((error) => {
            console.error('Error al crear mascota', error);
            throw error;
        });
};

const eliminarMascota = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: HEADERS
    }).then(res => {
        if (!res.ok) throw new Error('Error al eliminar mascota');
        return res;
    }).catch((error) => {
        console.error('Error al eliminar mascota', error);
        throw error;
    });
};

const obtenerMascota = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, { headers: HEADERS })
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener mascota');
            return res.json();
        }).catch((error) => {
            console.error('Error al obtener mascota', error);
            throw error;
        });
};

const actualizarMascota = (nombre, especie, raza, dueño, id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: { ...HEADERS, 'Prefer': 'return=representation' },
        body: JSON.stringify({ nombre, especie, raza, dueño })
    }).then(res => {
        if (!res.ok) throw new Error('Error al actualizar mascota');
        return res.json();
    }).catch((error) => {
        console.error('Error al actualizar mascota', error);
        throw error;
    });
};
const buscarMascota = (query) => {
    const url = `${API_URL}?or=(nombre.ilike.*${query}*,especie.ilike.*${query}*,raza.ilike.*${query}*,dueño.ilike.*${query}*)&select=*`;
    return fetch(url, { headers: HEADERS })
        .then(res => {
            if (!res.ok) throw new Error('Error al buscar mascotas');
            return res.json();
        })
        .catch(error => {
            console.error('Error al buscar mascotas:', error);
            throw error;
        });
};

export const mascotaService = {
    listarMascotas,
    crearMascota,
    eliminarMascota,
    obtenerMascota,
    actualizarMascota,
    buscarMascota
};
