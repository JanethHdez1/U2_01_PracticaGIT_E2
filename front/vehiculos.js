const contenedor = document.getElementById("cards-container");
const buscador = document.getElementById("buscador");
let vehiculos = []; // Ahora será poblado desde la API

// Función para obtener vehículos desde el backend
async function obtenerVehiculos() {
    try {
        const response = await fetch('http://localhost:8080/api/practica/vehiculo/mostrar');
        const data = await response.json();
        vehiculos = data.data; // Accedemos al array dentro de ApiResponse
        renderVehiculos();
    } catch (error) {
        console.error('Error obteniendo vehículos:', error);
    }
}

// Función para eliminar un vehículo
async function eliminarVehiculo(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/practica/vehiculo/eliminar/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            await obtenerVehiculos(); // Recargar la lista después de eliminar
        }
    } catch (error) {
        console.error('Error eliminando vehículo:', error);
    }
}

// Función para renderizar
function renderVehiculos(filtro = "") {
    contenedor.innerHTML = "";

    const resultados = vehiculos.filter(v =>
        v.marca.toLowerCase().includes(filtro.toLowerCase())
    );

    resultados.forEach(v => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title">${v.marca} ${v.modelo}</h5>
                        <p class="card-text"><strong>Placa:</strong> ${v.placas}</p>
                        <p class="card-text"><strong>Color:</strong> ${v.color}</p>
                        <p class="card-text"><strong>Proveedor:</strong> ${v.nombreProveedor}</p>
                    </div>
                    <div class="card-buttons mt-3 d-flex justify-content-center gap-3">
                        <i class="fas fa-edit text-primary" 
                           title="Editar" 
                           style="cursor: pointer;"
                           onclick="abrirModalEdicion('${v.id}')"></i>
                        <i class="fas fa-trash-alt text-danger" 
                           title="Eliminar" 
                           style="cursor: pointer;"
                           onclick="eliminarVehiculo('${v.id}')"></i>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(col);
    });
}

// Función para manejar búsquedas
buscador.addEventListener("input", (e) => {
    renderVehiculos(e.target.value);
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    obtenerVehiculos();
    
    // Configurar navegación
    document.getElementById("vehiculos-link").addEventListener("click", () => {
        document.getElementById("vehiculos-view").classList.remove("d-none");
        document.getElementById("proveedores-view").classList.add("d-none");
    });

    document.getElementById("proveedores-link").addEventListener("click", () => {
        document.getElementById("vehiculos-view").classList.add("d-none");
        document.getElementById("proveedores-view").classList.remove("d-none");
    });
});

// Modal de edición (agregar en tu HTML)
async function abrirModalEdicion(id) {
    // Implementar lógica para obtener el vehículo y mostrar formulario de edición
    console.log('Editar vehículo con ID:', id);
}