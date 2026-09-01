// Base de datos de productos de ejemplo
const productosTech = [
    { id: 1, nombre: "Notebook Gamer i7", precio: 899990, imagen: "img/notebook.jpg" },
    { id: 2, nombre: "Audífonos Bluetooth", precio: 45990, imagen: "img/audifonos.jpg" },
    { id: 3, nombre: "Teclado Mecánico RGB", precio: 59990, imagen: "img/teclado.jpg" },
    { id: 4, nombre: "Mouse Inalámbrico", precio: 29990, imagen: "img/mouse.jpg" }
];

document.addEventListener("DOMContentLoaded", function () {
    actualizarContador();
    cargarProductos();
});

// Función para obtener productos del LocalStorage
function obtenerCarritoStorage() {
    return JSON.parse(localStorage.getItem("techstore_carro")) || [];
}

// Actualizar número en el menú
function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        const carrito = obtenerCarritoStorage();
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = totalItems;
    }
}

// Mostrar tarjetas de productos en la vista
function cargarProductos() {
    const contenedor = document.getElementById("grilla-productos");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    productosTech.forEach(prod => {
        const card = document.createElement("div");
        card.className = "tarjeta-producto";
        card.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>Precio: $${prod.precio.toLocaleString('clp')}</p>
            <button onclick="agregarAlCarrito(${prod.id})">Añadir al Carrito</button>
        `;
        contenedor.appendChild(card);
    });
}

// Agregar producto al carrito y guardar en LocalStorage
function agregarAlCarrito(idProducto) {
    let carrito = obtenerCarritoStorage();
    const productoSel = productosTech.find(p => p.id === idProducto);

    const existe = carrito.find(p => p.id === idProducto);
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ ...productoSel, cantidad: 1 });
    }

    localStorage.setItem("techstore_carro", JSON.stringify(carrito));
    actualizarContador();
    alert("Producto agregado al carrito.");
}