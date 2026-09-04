// js/main.js

// Catálogo con los 19 productos exactos asociados a las imágenes de tu carpeta /images
const catalogoProductos = [
    { id: 1, nombre: "ASUS TUF Gaming A15", categoria: "notebooks", precio: 719990, img: "images/ASUS.png" },
    { id: 2, nombre: "HyperX Cloud Stinger 2", categoria: "perifericos", precio: 39990, img: "images/HyperX Cloud Stinger 2.jpg" },
    { id: 3, nombre: "Logitech G733 LIGHTSPEED", categoria: "perifericos", precio: 119990, img: "images/Logitech G733.jpg" },
    { id: 4, nombre: "Logitech G915 X LIGHTSPEED TKL", categoria: "perifericos", precio: 199990, img: "images/Logitech G915 X LIGHTSPEED TKL.jpg" },
    { id: 5, nombre: "Mouse Logitech Wireless", categoria: "perifericos", precio: 24990, img: "images/Logitech.jpg" },
    { id: 6, nombre: "Monitor Caixun 27\" 165Hz 1ms", categoria: "monitores", precio: 149990, img: "images/Monitor Caixun 27 pulgadas, 165Hz 1ms.jpg" },
    { id: 7, nombre: "Monitor LG UltraGear 27\" IPS", categoria: "monitores", precio: 189990, img: "images/Monitor LG 27 pulgadas, Panel IPS, 144Hz 1ms.jpg" },
    { id: 8, nombre: "Monitor Samsung Smart 32\" 4K", categoria: "monitores", precio: 249990, img: "images/Monitor Samsung 32 pulgadas, 4K 60Hz 4ms.jpg" },
    { id: 9, nombre: "Mouse Logitech G Pro 2", categoria: "perifericos", precio: 99990, img: "images/Mouse Logitech G Pro 2.jpg" },
    { id: 10, nombre: "Mouse Logitech G203 Lightsync", categoria: "perifericos", precio: 21990, img: "images/Mouse Logitech G203 Lightsync.jpg" },
    { id: 11, nombre: "Mouse Logitech G502 Hero", categoria: "perifericos", precio: 44990, img: "images/Mouse Logitech G502 Hero.jpg" },
    { id: 12, nombre: "Mouse Razer Cobra Pro", categoria: "perifericos", precio: 129990, img: "images/Mouse Razer Cobra Pro.jpg" },
    { id: 13, nombre: "AMD Ryzen 9 9900X 4.4GHz", categoria: "componentes", precio: 549990, img: "images/Procesador AMD Ryzen 9 9900X 4,4GHz 12 cores 24 hilos.jpg" },
    { id: 14, nombre: "AMD Ryzen 7 9700X 3.8GHz", categoria: "componentes", precio: 389990, img: "images/Procesador Ryzen 7 9700X 3,8GHz 8 nucleos 16 hilos.jpg" },
    { id: 15, nombre: "NVIDIA GeForce RTX 4060 8GB", categoria: "componentes", precio: 349990, img: "images/RTX.png" },
    { id: 16, nombre: "Razer BlackShark V2", categoria: "perifericos", precio: 69990, img: "images/Ryzen BlackShark V2.jpg" },
    { id: 17, nombre: "Logitech G PRO X 60 LIGHTSPEED", categoria: "perifericos", precio: 159990, img: "images/Teclado Logitech G PRO X 60.png" },
    { id: 18, nombre: "Teclado Logitech G915 RGB", categoria: "perifericos", precio: 179990, img: "images/Teclado Logitech G915.jpg" },
    { id: 19, nombre: "Teclado Redragon Kurama Blanco 60%", categoria: "perifericos", precio: 39990, img: "images/Teclado Redragon Kurama blanco 60.jpg" }
];

function getProductos() {
    return catalogoProductos;
}

document.addEventListener("DOMContentLoaded", () => {
    // Inicialización del Carrusel horizontal estilo SoloTodo
    const track = document.getElementById("carouselTrack");
    if (track) {
        renderCarrusel(track);
        initCarouselControls(track);
    }

    // Inicialización de Grilla de Filtros (Si existe)
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

// Renderiza todos los productos guardados dentro de la pista del carrusel
function renderCarrusel(trackElement) {
    trackElement.innerHTML = "";

    catalogoProductos.forEach(producto => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-img-box">
                <img src="${producto.img}" alt="${producto.nombre}">
            </div>
            <div class="product-info">
                <span class="product-category">${producto.categoria}</span>
                <h3>${producto.nombre}</h3>
                <div class="rating">★★★★☆ <span class="rating-count">(12)</span></div>
                <div class="price-box">
                    <span class="current-price">$${producto.precio.toLocaleString("es-CL")}</span>
                </div>
                <button class="btn-primary" onclick="addToCart(${producto.id})">Agregar al Carrito</button>
            </div>
        `;
        trackElement.appendChild(card);
    });

    // Tarjeta final para invitar a ver más
    const ctaCard = document.createElement("div");
    ctaCard.className = "product-card catalog-cta-card";
    ctaCard.innerHTML = `
        <div class="cta-content">
            <span class="cta-icon">🚀</span>
            <h3>¿Buscas algo más?</h3>
            <p>Explora todo nuestro catálogo con filtros y ordenamiento.</p>
            <a href="productos.html" class="btn-banner">Ver todo el catálogo</a>
        </div>
    `;
    trackElement.appendChild(ctaCard);
}

// Configuración de eventos para desplazar las flechas izquierda y derecha
function initCarouselControls(trackElement) {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            trackElement.scrollBy({ left: -320, behavior: "smooth" });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            trackElement.scrollBy({ left: 320, behavior: "smooth" });
        });
    }
}

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
// Control de sesión en el Header
document.addEventListener("DOMContentLoaded", () => {
    actualizarSesionHeader();
});

function actualizarSesionHeader() {
    const sesion = JSON.parse(localStorage.getItem("usuarioSesion"));
    const navLoginItem = document.getElementById("navLoginItem");
    const navProfileItem = document.getElementById("navProfileItem");
    const navUserName = document.getElementById("navUserName");
    const btnLogout = document.getElementById("btnLogout");

    if (sesion && (sesion.nombre || sesion.usuario)) {
        if (navLoginItem) navLoginItem.style.display = "none";
        if (navProfileItem) navProfileItem.style.display = "inline-flex";
        if (navUserName) navUserName.textContent = sesion.nombre || sesion.usuario;
    } else {
        if (navLoginItem) navLoginItem.style.display = "block";
        if (navProfileItem) navProfileItem.style.display = "none";
    }

    if (btnLogout) {
        btnLogout.onclick = () => {
            localStorage.removeItem("usuarioSesion");
            window.location.reload();
        };
    }
}