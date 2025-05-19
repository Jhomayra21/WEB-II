//PARTE SUPABASE
const SUPABASE_URL = 'https://kkihuzcyhyedxbmlcant.supabase.co';  //variables de conexion
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtraWh1emN5aHllZHhibWxjYW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY5ODIsImV4cCI6MjA2MjQ1Mjk4Mn0.d3a897oIa5wJ2LP8qNSko4wbG3Th7awkf0B479Ldo4I'
const TABLE='productos';
const API_URL=`${SUPABASE_URL}/rest/v1/${TABLE}`;
const HEADERS={
    'apikey':SUPABASE_KEY,
    'Authorization':`Bearer ${SUPABASE_KEY}`,
    'Content-Type':'application/json'
}
const listarProductos = () => {
    return fetch(`${API_URL}?select=*`, { headers: HEADERS })
        .then(res => {
            if (!res.ok) throw new Error('Error en listar productos');
            return res.json();
        });
};

const crearProducto = (nombre, precio, descripcion) => {
    const producto = {
        nombre,
        precio: parseInt(precio), // Ensure precio is an integer
        descripcion,
        id: uuid.v4()
    };
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(producto)
    })
        .then(async (res) => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Error al insertar producto');
            }
            const text = await res.text();
            return text ? JSON.parse(text) : producto;
        }).catch((error) => {
            console.error('Error al crear producto', error);
            throw error;
        });
};

const eliminarProducto = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: HEADERS
    }).then(res => {
        if (!res.ok) throw new Error('Error al eliminar producto');
        return res;
    }).catch((error) => {
        console.error('Error al eliminar producto', error);
        throw error;
    });
};

const obtenerProducto = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, { headers: HEADERS })
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener producto');
            return res.json();
        }).catch((error) => {
            console.error('Error al obtener producto', error);
            throw error;
        });
};

const actualizarProducto = (nombre, precio, descripcion, id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: { ...HEADERS, 'Prefer': 'return=representation' },
        body: JSON.stringify({ nombre, precio: parseInt(precio), descripcion })
    }).then(res => {
        if (!res.ok) throw new Error('Error al actualizar producto');
        return res.json();
    }).catch((error) => {
        console.error('Error al actualizar producto', error);
        throw error;
    });
};
const buscarProductos = (query) => {
    if (!isNaN(query) && query.trim() !== "") {
        return fetch(`${API_URL}?precio=eq.${query}&select=*`, { headers: HEADERS })
            .then(res => {
                if (!res.ok) throw new Error("No se pudo buscar productos por precio");
                return res.json();
            });
    } else {
        const filtro = `or=(nombre.ilike.*${query}*,descripcion.ilike.*${query}*)`;
        return fetch(`${API_URL}?${filtro}&select=*`, { headers: HEADERS })
            .then(res => {
                if (!res.ok) throw new Error("No se pudo buscar productos");
                return res.json();
            });
    }
};
export const productService = {
    listarProductos,
    crearProducto,
    eliminarProducto,
    obtenerProducto,
    actualizarProducto,
    buscarProductos
};


