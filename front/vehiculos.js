// Elementos del DOM
const contenedor = document.getElementById("cards-container");
const buscador = document.getElementById("buscador");
let vehiculos = [];
let vehiculoAEliminar = null;

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

    // Configurar modal de confirmación
    document.getElementById("confirmActionBtn").addEventListener("click", eliminarVehiculoConfirmado);
});

// ========== FUNCIONES CRUD ==========

// Obtener todos los vehículos
async function obtenerVehiculos() {
    try {
        const response = await fetch('http://localhost:8080/api/practica/vehiculo/mostrar');
        const data = await response.json();
        vehiculos = data.data;
        renderVehiculos();
    } catch (error) {
        console.error('Error obteniendo vehículos:', error);
        mostrarError('Error al cargar los vehículos');
    }
}

// Guardar nuevo vehículo
async function guardarVehiculo() {
    try {
        const nuevoVehiculo = {
            marca: document.getElementById('marca').value,
            modelo: document.getElementById('modelo').value,
            placas: document.getElementById('placas').value,
            color: document.getElementById('color').value,
            nombreProveedor: document.getElementById('proveedor').value,
        };

        // Validación simple
        if (!nuevoVehiculo.marca || !nuevoVehiculo.modelo || !nuevoVehiculo.placas || !nuevoVehiculo.color || !nuevoVehiculo.nombreProveedor) {
            mostrarError('Todos los campos obligatorios deben estar completos');
            return;
        }

        const response = await fetch('http://localhost:8080/api/practica/vehiculo/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoVehiculo)
        });

        if (response.ok) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('registroModal'));
            modal.hide();
            document.getElementById('formVehiculo').reset();
            await obtenerVehiculos();
            mostrarExito('Vehículo registrado correctamente');
        } else {
            mostrarError('Error al registrar el vehículo');
        }
    } catch (error) {
        console.error('Error guardando vehículo:', error);
        mostrarError('Error al registrar el vehículo');
    }
}

// Mostrar detalles de un vehículo
async function mostrarDetalles(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/practica/vehiculo/mostrar/${id}`);
        const data = await response.json();
        const vehiculo = data.data;

        const detallesHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <h5>${vehiculo.marca} ${vehiculo.modelo}</h5>
                        <hr>
                        <p><strong><i class="fas fa-id-card me-2"></i>Placas:</strong> ${vehiculo.placas}</p>
                        <p><strong><i class="fas fa-palette me-2"></i>Color:</strong> ${vehiculo.color}</p>
                        <p><strong><i class="fas fa-truck me-2"></i>Proveedor:</strong> ${vehiculo.nombreProveedor}</p>
                        <p><strong><i class="fas fa-fingerprint me-2"></i>ID:</strong> ${vehiculo.id}</p>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('detallesVehiculo').innerHTML = detallesHTML;
        const modal = new bootstrap.Modal(document.getElementById('detallesModal'));
        modal.show();
    } catch (error) {
        console.error('Error obteniendo detalles:', error);
        mostrarError('Error al cargar los detalles del vehículo');
    }
}

// Abrir modal de edición
async function abrirModalEdicion(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/practica/vehiculo/mostrar/${id}`);
        const data = await response.json();
        const vehiculo = data.data;

        document.getElementById('editId').value = vehiculo.id;
        document.getElementById('editMarca').value = vehiculo.marca;
        document.getElementById('editModelo').value = vehiculo.modelo;
        document.getElementById('editPlacas').value = vehiculo.placas;
        document.getElementById('editColor').value = vehiculo.color;
        document.getElementById('editProveedor').value = vehiculo.nombreProveedor;

        const modal = new bootstrap.Modal(document.getElementById('edicionModal'));
        modal.show();
    } catch (error) {
        console.error('Error abriendo edición:', error);
        mostrarError('Error al cargar el vehículo para edición');
    }
}

// Actualizar vehículo
async function actualizarVehiculo() {
    try {
        const vehiculoActualizado = {
            marca: document.getElementById('editMarca').value,
            modelo: document.getElementById('editModelo').value,
            placas: document.getElementById('editPlacas').value,
            color: document.getElementById('editColor').value,
            nombreProveedor: document.getElementById('editProveedor').value,
        };

        const id = document.getElementById('editId').value;

        // Validación
        if (!vehiculoActualizado.marca || !vehiculoActualizado.modelo || !vehiculoActualizado.placas || 
            !vehiculoActualizado.color || !vehiculoActualizado.nombreProveedor) {
            mostrarError('Todos los campos obligatorios deben estar completos');
            return;
        }

        const response = await fetch(`http://localhost:8080/api/practica/vehiculo/actualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehiculoActualizado)
        });

        if (response.ok) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('edicionModal'));
            modal.hide();
            await obtenerVehiculos();
            mostrarExito('Vehículo actualizado correctamente');
        } else {
            mostrarError('Error al actualizar el vehículo');
        }
    } catch (error) {
        console.error('Error actualizando vehículo:', error);
        mostrarError('Error al actualizar el vehículo');
    }
}

// Confirmar eliminación
function confirmarEliminacion(id) {
    vehiculoAEliminar = id;
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
}

// Eliminar vehículo después de confirmación
async function eliminarVehiculoConfirmado() {
    if (!vehiculoAEliminar) return;

    try {
        const response = await fetch(`http://localhost:8080/api/practica/vehiculo/eliminar/${vehiculoAEliminar}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
            modal.hide();
            await obtenerVehiculos();
            mostrarExito('Vehículo eliminado correctamente');
        } else {
            mostrarError('Error al eliminar el vehículo');
        }
    } catch (error) {
        console.error('Error eliminando vehículo:', error);
        mostrarError('Error al eliminar el vehículo');
    } finally {
        vehiculoAEliminar = null;
    }
}

// ========== FUNCIONES AUXILIARES ==========

// Renderizar vehículos
function renderVehiculos(filtro = "") {
    contenedor.innerHTML = "";

    const resultados = vehiculos.filter(v =>
        v.marca.toLowerCase().includes(filtro.toLowerCase()) ||
        v.modelo.toLowerCase().includes(filtro.toLowerCase()) ||
        v.placas.toLowerCase().includes(filtro.toLowerCase())
    );

    if (resultados.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-car text-muted" style="font-size: 5rem;"></i>
                <h4 class="mt-3">No se encontraron vehículos</h4>
                <p class="text-muted">Intenta con otro término de búsqueda</p>
            </div>
        `;
        return;
    }

    resultados.forEach(v => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                ${v.imagen ? 
                    `<img src="${v.imagen}" class="card-img-top" alt="${v.marca} ${v.modelo}">` : 
                    `<div class="card-img-top bg-light d-flex align-items-center justify-content-center">
                        <i class="fas fa-car text-muted" style="font-size: 3rem;"></i>
                    </div>`}
                <div class="card-body d-flex flex-column">
                    <div>
                        <h5 class="card-title">${v.marca} ${v.modelo}</h5>
                        <p class="card-text"><strong><i class="fas fa-id-card me-1"></i>Placa:</strong> ${v.placas}</p>
                        <p class="card-text"><strong><i class="fas fa-palette me-1"></i>Color:</strong> ${v.color}</p>
                    </div>
                    <div class="mt-auto">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-info btn-sm me-md-2" onclick="mostrarDetalles('${v.id}')">
                                <i class="fas fa-info-circle me-1"></i>Detalles
                            </button>
                            <button class="btn btn-warning btn-sm me-md-2" onclick="abrirModalEdicion('${v.id}')">
                                <i class="fas fa-edit me-1"></i>Editar
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="confirmarEliminacion('${v.id}')">
                                <i class="fas fa-trash-alt me-1"></i>Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(col);
    });
}

// Mostrar mensaje de éxito
function mostrarExito(mensaje) {
    const toastHTML = `
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1100">
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-success text-white">
                    <strong class="me-auto"><i class="fas fa-check-circle me-2"></i>Éxito</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${mensaje}
                </div>
            </div>
        </div>
    `;
    
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = toastHTML;
    document.body.appendChild(toastContainer);
    
    setTimeout(() => {
        toastContainer.remove();
    }, 3000);
}

// Mostrar mensaje de error
function mostrarError(mensaje) {
    const toastHTML = `
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1100">
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-danger text-white">
                    <strong class="me-auto"><i class="fas fa-exclamation-circle me-2"></i>Error</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${mensaje}
                </div>
            </div>
        </div>
    `;
    
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = toastHTML;
    document.body.appendChild(toastContainer);
    
    setTimeout(() => {
        toastContainer.remove();
    }, 3000);
}

// Búsqueda en tiempo real
buscador.addEventListener("input", (e) => {
    renderVehiculos(e.target.value);
});