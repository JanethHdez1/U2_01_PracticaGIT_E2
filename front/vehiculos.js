const vehiculos = [
    { marca: "Toyota", modelo: "Corolla", placa: "ABC123", color: "Rojo", proveedor: "Proveedor A" },
    { marca: "Ford", modelo: "Fiesta", placa: "DEF456", color: "Azul", proveedor: "Proveedor B" },
    { marca: "Honda", modelo: "Civic", placa: "GHI789", color: "Negro", proveedor: "Proveedor C" }
];

const contenedor = document.getElementById("cards-container");
const buscador = document.getElementById("buscador");

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
                    <p class="card-text"><strong>Placa:</strong> ${v.placa}</p>
                    <p class="card-text"><strong>Color:</strong> ${v.color}</p>
                    <p class="card-text"><strong>Proveedor:</strong> ${v.proveedor}</p>
                </div>
                <div class="card-buttons mt-auto">
                    <i class="fas fa-edit" title="Editar"></i>
                    <i class="fas fa-trash-alt" title="Eliminar"></i>
                </div>
                </div>
            </div>
        `;
        contenedor.appendChild(col);
    });
}

buscador.addEventListener("input", (e) => {
    renderVehiculos(e.target.value);
});

// Navbar navegación
document.getElementById("vehiculos-link").addEventListener("click", () => {
    document.getElementById("vehiculos-view").classList.remove("d-none");
    document.getElementById("proveedores-view").classList.add("d-none");
});

document.getElementById("proveedores-link").addEventListener("click", () => {
    document.getElementById("vehiculos-view").classList.add("d-none");
    document.getElementById("proveedores-view").classList.remove("d-none");
});

renderVehiculos();
