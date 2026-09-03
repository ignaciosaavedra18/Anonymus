// js/main.js

// 1. Catálogo actualizado con las imágenes reales de tu carpeta /images
const catalogoProductos = [
    { id: 1, nombre: "ASUS TUF Gaming A15", categoria: "notebooks", precio: 719990, img: "images/ASUS.png" },
    { id: 2, nombre: "Logitech G Pro X Superlight", categoria: "perifericos", precio: 99990, img: "images/Mouse Logitech G Pro 2.jpg" },
    { id: 3, nombre: "LG UltraGear 27\" 27GN600", categoria: "monitores", precio: 189990, img: "images/Monitor LG 27 pulgadas, Panel IPS, 144Hz.jpg" },
    { id: 4, nombre: "NVIDIA GeForce RTX 4060 8GB", categoria: "componentes", precio: 349990, img: "images/RTX.png" },
    { id: 5, nombre: "AMD Ryzen 7 7800X3D", categoria: "componentes", precio: 429990, img: "images/Procesador Ryzen 7 9700X 3,8GHz 8 nucleos.jpg" },
    { id: 6, nombre: "Corsair Vengeance RGB 32GB DDR5", categoria: "componentes", precio: 129990, img: "images/RTX.png" },
    { id: 7, nombre: "HyperX Alloy Origins Core", categoria: "perifericos", precio: 69990, img: "images/Teclado Logitech G915.jpg" },
    { id: 8, nombre: "Razer BlackShark V2 X", categoria: "perifericos", precio: 49990, img: "images/HyperX Cloud Stinger 2.jpg" },
    { id: 9, nombre: "Gabinete MSI MAG Forge 100R", categoria: "componentes", precio: 59990, img: "images/ASUS.png" }
];

// Función requerida por carrito.js
function getProductos() {
    return catalogoProductos;
}

document.addEventListener("DOMContentLoaded", () => {
    const grilla = document.getElementById("grilla-productos");

    // Solo se ejecuta si estamos en productos.html
    if (grilla) {
        // Evento al hacer clic en "Aplicar Filtros"
        const btnApply = document.getElementById("btnApplyFilters");
        if (btnApply) {
            btnApply.addEventListener("click", aplicarFiltros);
        }

        // Evento al escribir o presionar Enter en el buscador central
        const searchInput = document.getElementById("searchInput");
        const searchBtn = document.querySelector(".search-bar button");

        if (searchInput) {
            searchInput.addEventListener("keyup", (e) => {
                if (e.key === "Enter") aplicarFiltros();
            });
        }
        if (searchBtn) {
            searchBtn.addEventListener("click", aplicarFiltros);
        }
    }
});

// Función de filtrado directo sobre el HTML
function aplicarFiltros() {
    // 1. Obtener los valores seleccionados
    const catSeleccionada = document.getElementById("filterCategory") ? document.getElementById("filterCategory").value : "todos";
    const precioMinInput = document.getElementById("priceMin") ? document.getElementById("priceMin").value : "";
    const precioMaxInput = document.getElementById("priceMax") ? document.getElementById("priceMax").value : "";
    const textoBusqueda = document.getElementById("searchInput") ? document.getElementById("searchInput").value.toLowerCase().trim() : "";

    const precioMin = precioMinInput !== "" ? parseInt(precioMinInput) : 0;
    const precioMax = precioMaxInput !== "" ? parseInt(precioMaxInput) : Infinity;

    // 2. Obtener todas las tarjetas de productos existentes en el HTML
    const tarjetas = document.querySelectorAll("#grilla-productos .product-card");
    let tarjetasVisibles = 0;

    tarjetas.forEach(card => {
        // Leer la categoría escrita en el <span class="product-category">
        const catTexto = card.querySelector(".product-category")?.textContent.trim() || "";
        const catNormalizada = normalizarCategoria(catTexto);

        // Leer el precio escrito en el <div class="product-price"> (extrae solo los números)
        const precioTexto = card.querySelector(".product-price")?.textContent || "";
        const precio = parseInt(precioTexto.replace(/\D/g, "")) || 0;

        // Leer todo el texto de la tarjeta para búsqueda general
        const textoTarjeta = card.textContent.toLowerCase();

        // Comprobar si cumple las 3 condiciones
        const cumpleCategoria = (catSeleccionada === "todos") || (catNormalizada === catSeleccionada);
        const cumplePrecio = (precio >= precioMin) && (precio <= precioMax);
        const cumpleBusqueda = (textoBusqueda === "") || textoTarjeta.includes(textoBusqueda);

        // 3. Mostrar u Ocultar la tarjeta
        if (cumpleCategoria && cumplePrecio && cumpleBusqueda) {
            card.style.display = ""; // Muestra el elemento respetando tu CSS
            tarjetasVisibles++;
        } else {
            card.style.display = "none"; // Oculta el elemento
        }
    });

    // 4. Actualizar el contador de resultados
    const contador = document.querySelector(".results-count");
    if (contador) {
        contador.textContent = `Mostrando ${tarjetasVisibles} producto(s)`;
    }
}

// Utilidad para vincular el texto HTML con el valor del <select>
function normalizarCategoria(texto) {
    const t = texto.toLowerCase().trim();
    if (t.includes("notebook")) return "notebooks";
    if (t.includes("periférico") || t.includes("periferico")) return "perifericos";
    if (t.includes("monitor")) return "monitores";
    if (t.includes("componente")) return "componentes";
    return "todos";
}