const CART_KEY = "techstore_carrito";

document.addEventListener("DOMContentLoaded", function () {
    actualizarContadorCarrito();
    renderizarCarrito();
});

// --- Utilidades de almacenamiento ---

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function formatearPrecio(valor) {
    return "$" + Math.round(valor).toLocaleString("es-CL");
}

// --- Contador del ícono en el header (todas las páginas) ---

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.querySelectorAll(".cart-count").forEach(el => {
        el.textContent = totalItems;
    });
}

// --- Agregar producto (llamado desde productos.html: onclick="addToCart(id)") ---

function addToCart(idProducto) {
    const catalogo = typeof getProductos === "function" ? getProductos() : [];
    const producto = catalogo.find(p => p.id === idProducto);
    if (!producto) return;

    const carrito = obtenerCarrito();
    const existente = carrito.find(p => p.id === idProducto);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            img: producto.img,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    renderizarCarrito();
}

// --- Cambiar cantidad (+/-) ---

function cambiarCantidad(idProducto, delta) {
    const carrito = obtenerCarrito();
    const item = carrito.find(p => p.id === idProducto);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        return eliminarDelCarrito(idProducto);
    }

    guardarCarrito(carrito);
    renderizarCarrito();
}

// --- Eliminar producto ---

function eliminarDelCarrito(idProducto) {
    const carrito = obtenerCarrito().filter(p => p.id !== idProducto);
    guardarCarrito(carrito);
    renderizarCarrito();
}

// --- Pintar la tabla del carrito (solo aplica en carrito.html) ---

function renderizarCarrito() {
    const cuerpoTabla = document.getElementById("cartTableBody");
    if (!cuerpoTabla) return; // No estamos en carrito.html

    const carrito = obtenerCarrito();
    const tabla = document.getElementById("cartTable");
    const estadoVacio = document.getElementById("cartEmpty");

    if (carrito.length === 0) {
        cuerpoTabla.innerHTML = "";
        if (tabla) tabla.hidden = true;
        if (estadoVacio) estadoVacio.hidden = false;
        actualizarResumen(0);
        return;
    }

    if (tabla) tabla.hidden = false;
    if (estadoVacio) estadoVacio.hidden = true;

    cuerpoTabla.innerHTML = carrito.map(item => {
        const subtotal = item.precio * item.cantidad;
        return `
            <tr>
                <td>
                    <div class="cart-product-cell">
                        <img src="${item.img || 'images/placeholder.png'}" alt="${item.nombre}"
                             onerror="this.src='https://via.placeholder.com/56?text=%20'">
                        <span class="cart-product-name">${item.nombre}</span>
                    </div>
                </td>
                <td>${formatearPrecio(item.precio)}</td>
                <td>
                    <div class="qty-stepper">
                        <button type="button" onclick="cambiarCantidad(${item.id}, -1)" aria-label="Restar">−</button>
                        <span>${item.cantidad}</span>
                        <button type="button" onclick="cambiarCantidad(${item.id}, 1)" aria-label="Sumar">+</button>
                    </div>
                </td>
                <td class="cart-subtotal-cell">${formatearPrecio(subtotal)}</td>
                <td>
                    <button type="button" class="btn-remove" onclick="eliminarDelCarrito(${item.id})" aria-label="Eliminar producto">🗑️</button>
                </td>
            </tr>
        `;
    }).join("");

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    actualizarResumen(total);
}

// --- Actualizar panel de resumen (subtotal / envío / total) ---

function actualizarResumen(total) {
    const elSubtotal = document.getElementById("cartSubtotal");
    const elTotal = document.getElementById("cartTotal");
    const elBoton = document.getElementById("btnFinalizar");

    if (elSubtotal) elSubtotal.textContent = formatearPrecio(total);
    if (elTotal) elTotal.textContent = formatearPrecio(total);
    if (elBoton) elBoton.disabled = total === 0;
}

// --- Finalizar compra ---

function finalizarCompra() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return;

    alert("¡Gracias por tu compra!");
    localStorage.removeItem(CART_KEY);
    actualizarContadorCarrito();
    renderizarCarrito();
}