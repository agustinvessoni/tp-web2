const API = "http://localhost:3000";

// ----------------------
// CARGAR PRODUCTOS
// ----------------------
function cargarProductos() {
    fetch(`${API}/productos`)
        .then(res => res.json())
        .then(data => {
            const contenedor = document.getElementById("productos");
            contenedor.innerHTML = "";

            data.forEach(prod => {
                contenedor.innerHTML += `
                    <div class="card">
                        <img src="${prod.imagen}" alt="${prod.nombre}" />
                        <h3>${prod.nombre}</h3>
                        <p><strong>$ ${prod.precio}</strong></p>
                        <button onclick="agregarCarrito(${prod.id})">
                            Agregar
                        </button>
                    </div>
                `;
            });
        });
}

// ----------------------
// AGREGAR AL CARRITO
// ----------------------
function agregarCarrito(id) {
    fetch(`${API}/carrito`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ producto_id: id })
    }).then(() => {
        cargarCarrito();
        cargarTotal();
    });
}

// ----------------------
// CARGAR CARRITO
// ----------------------
function cargarCarrito() {
    fetch(`${API}/carrito`)
        .then(res => res.json())
        .then(data => {
            const contenedor = document.getElementById("carrito-items");
            contenedor.innerHTML = "";

            data.forEach(item => {
                contenedor.innerHTML += `
                    <div class="item">
                        <span>${item.nombre} - $ ${item.precio}</span>
                        <button onclick="eliminarItem(${item.carrito_id})">X</button>
                    </div>
                `;
            });
        });
}

// ----------------------
// ELIMINAR DEL CARRITO
// ----------------------
function eliminarItem(id) {
    fetch(`${API}/carrito/${id}`, {
        method: "DELETE"
    }).then(() => {
        cargarCarrito();
        cargarTotal();
    });
}

// ----------------------
// TOTAL
// ----------------------
function cargarTotal() {
    fetch(`${API}/carrito/total`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("total").innerText = `$ ${data.total || 0}`;
        });
}

// ----------------------
// INIT
// ----------------------
cargarProductos();
cargarCarrito();
cargarTotal();