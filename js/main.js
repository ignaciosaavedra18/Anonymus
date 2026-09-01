// Arreglo base de productos (Simulación de catálogo)
const PRODUCTOS_BASE = [
    { id: 1, nombre: "Notebook Gamer", precio: 890000, categoria: "computadores", stock: 5, img: "img/p1.jpg" },
    { id: 2, nombre: "Mouse Inalámbrico", precio: 25000, categoria: "accesorios", stock: 2, img: "img/p2.jpg" },
    { id: 3, nombre: "Smartphone 5G", precio: 450000, categoria: "celulares", stock: 8, img: "img/p3.jpg" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar productos en localStorage si no existen
    if (!localStorage.getItem('techstore_productos')) {
        localStorage.setItem('techstore_productos', JSON.stringify(PRODUCTOS_BASE));
    }
    
    // Cargar productos en la tienda si existe el contenedor
    const catalogoContainer = document.getElementById('catalogoProductos');
    if (catalogoContainer) {
        renderizarCatalogo(catalogoContainer);
    }
});

function getProductos() {
    return JSON.parse(localStorage.getItem('techstore_productos')) || [];
}

function renderizarCatalogo(container) {
    const productos = getProductos();
    container.innerHTML = productos.map(prod => `
        <div class="card-producto">
            <img src="${prod.img}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>Precio: $${prod.precio.toLocaleString('es-CL')}</p>
            <p class="${prod.stock <= 3 ? 'stock-critico' : ''}">Stock: ${prod.stock}</p>
            <button onclick="addToCart(${prod.id})">Agregar al Carrito</button>
        </div>
    `).join('');
}