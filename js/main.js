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
    // ==========================================
    // 2. CONTROL DEL CARRUSEL EN EL HOME (index.html)
    // ==========================================
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const firstCard = track.querySelector('.product-card, .card-producto');
            if (firstCard) {
                return firstCard.offsetWidth + 20; // Ancho + gap
            }
            return 300;
        };

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

    // ==========================================
    // 3. CONTROL DE FILTROS Y BÚSQUEDA (productos.html)
    // ==========================================
    const grilla = document.getElementById("grilla-productos");

    if (grilla) {
        const btnApply = document.getElementById("btnApplyFilters");
        if (btnApply) {
            btnApply.addEventListener("click", aplicarFiltros);
        }

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

// Función de filtrado en productos.html
function aplicarFiltros() {
    const catSeleccionada = document.getElementById("filterCategory") ? document.getElementById("filterCategory").value : "todos";
    const precioMinInput = document.getElementById("priceMin") ? document.getElementById("priceMin").value : "";
    const precioMaxInput = document.getElementById("priceMax") ? document.getElementById("priceMax").value : "";
    const textoBusqueda = document.getElementById("searchInput") ? document.getElementById("searchInput").value.toLowerCase().trim() : "";

    const precioMin = precioMinInput !== "" ? parseInt(precioMinInput) : 0;
    const precioMax = precioMaxInput !== "" ? parseInt(precioMaxInput) : Infinity;

    const tarjetas = document.querySelectorAll("#grilla-productos .product-card");
    let tarjetasVisibles = 0;

    tarjetas.forEach(card => {
        const catTexto = card.querySelector(".product-category")?.textContent.trim() || "";
        const catNormalizada = normalizarCategoria(catTexto);

        const precioTexto = card.querySelector(".product-price")?.textContent || "";
        const precio = parseInt(precioTexto.replace(/\D/g, "")) || 0;

        const textoTarjeta = card.textContent.toLowerCase();

        const cumpleCategoria = (catSeleccionada === "todos") || (catNormalizada === catSeleccionada);
        const cumplePrecio = (precio >= precioMin) && (precio <= precioMax);
        const cumpleBusqueda = (textoBusqueda === "") || textoTarjeta.includes(textoBusqueda);

        if (cumpleCategoria && cumplePrecio && cumpleBusqueda) {
            card.style.display = ""; 
            tarjetasVisibles++;
        } else {
            card.style.display = "none"; 
        }
    });

    const contador = document.querySelector(".results-count");
    if (contador) {
        contador.textContent = `Mostrando ${tarjetasVisibles} producto(s)`;
    }
}

function normalizarCategoria(texto) {
    const t = texto.toLowerCase().trim();
    if (t.includes("notebook")) return "notebooks";
    if (t.includes("periférico") || t.includes("periferico")) return "perifericos";
    if (t.includes("monitor")) return "monitores";
    if (t.includes("componente")) return "componentes";
    return "todos";
}