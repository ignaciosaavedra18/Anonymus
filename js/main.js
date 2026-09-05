

// este es el catalogo con unos 19 productos asociados a las imágenes de la carpeta images
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

// Cargar funciones cuando el HTML este listo
document.addEventListener("DOMContentLoaded", function() {
    
    // Inicializar carrusel en la pagina de inicio
    let pistaCarrusel = document.getElementById("carouselTrack");
    if (pistaCarrusel) {
        renderCarrusel(pistaCarrusel);
    }

    // Configurar filtros si estamos en la pagina del catalogo
    let grillaProductos = document.getElementById("grilla-productos");
    if (grillaProductos) {
        let btnFiltros = document.getElementById("btnApplyFilters");
        if (btnFiltros) {
            btnFiltros.addEventListener("click", aplicarFiltros);
        }

        let inputBusqueda = document.getElementById("searchInput");
        let btnBusqueda = document.querySelector(".search-bar button");

        if (inputBusqueda) {
            inputBusqueda.addEventListener("keyup", function(e) {
                if (e.key === "Enter") aplicarFiltros();
            });
        }
        
        if (btnBusqueda) {
            btnBusqueda.addEventListener("click", aplicarFiltros);
        }
    }

    // Verificar si hay usuario logueado en el header
    actualizarSesionHeader();
});

// Renderizar las 2 filas de productos con botones laterales
function renderCarrusel(trackElement) {
    trackElement.innerHTML = "";

    // Separar productos para la fila 1 y fila 2
    let productosFila1 = catalogoProductos.slice(0, 7);
    let productosFila2 = catalogoProductos.slice(7, 14);

    // Funcion interna para generar la estructura de la tarjeta
    function generarTarjetaHTML(producto) {
        return `
            <div class="product-card">
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
            </div>
        `;
    }

    // Tarjeta del final para redireccionar al catalogo completo
    let tarjetaIrACatalogo = `
        <div class="product-card catalog-cta-card">
            <div class="cta-content">
                <span class="cta-icon">🚀</span>
                <h3>¿No encontraste lo que buscabas?</h3>
                <p>Explora todo nuestro catálogo con filtros y ofertas.</p>
                <a href="productos.html" class="btn-banner">Ver catálogo completo</a>
            </div>
        </div>
    `;

    // Crear una fila horizontal completa con sus botones de scroll
    function crearFilaConBotones(listaProductos, mostrarCta) {
        let contenedorFila = document.createElement("div");
        contenedorFila.className = "carousel-row-wrapper";

        let botonAnterior = document.createElement("button");
        botonAnterior.className = "carousel-btn prev-btn";
        botonAnterior.innerHTML = "❮";
        botonAnterior.setAttribute("aria-label", "Anterior");

        let pistaHorizontal = document.createElement("div");
        pistaHorizontal.className = "carousel-row-track";

        // Cargar productos de la fila usando un bucle clasico
        let htmlAcumulado = "";
        for (let i = 0; i < listaProductos.length; i++) {
            htmlAcumulado += generarTarjetaHTML(listaProductos[i]);
        }

        if (mostrarCta) {
            htmlAcumulado += tarjetaIrACatalogo;
        }

        pistaHorizontal.innerHTML = htmlAcumulado;

        let botonSiguiente = document.createElement("button");
        botonSiguiente.className = "carousel-btn next-btn";
        botonSiguiente.innerHTML = "❯";
        botonSiguiente.setAttribute("aria-label", "Siguiente");

        // Eventos de movimiento horizontal al hacer clic
        botonAnterior.onclick = function() {
            pistaHorizontal.scrollBy({ left: -320, behavior: "smooth" });
        };

        botonSiguiente.onclick = function() {
            pistaHorizontal.scrollBy({ left: 320, behavior: "smooth" });
        };

        contenedorFila.appendChild(botonAnterior);
        contenedorFila.appendChild(pistaHorizontal);
        contenedorFila.appendChild(botonSiguiente);

        return contenedorFila;
    }

    // Insertar ambas filas al contenedor principal del HTML
    trackElement.appendChild(crearFilaConBotones(productosFila1, true));
    trackElement.appendChild(crearFilaConBotones(productosFila2, true));
}

// Filtrar productos en la vista de catalogo
function aplicarFiltros() {
    let catSeleccionada = document.getElementById("filterCategory") ? document.getElementById("filterCategory").value : "todos";
    let precioMinInput = document.getElementById("priceMin") ? document.getElementById("priceMin").value : "";
    let precioMaxInput = document.getElementById("priceMax") ? document.getElementById("priceMax").value : "";
    let textoBusqueda = document.getElementById("searchInput") ? document.getElementById("searchInput").value.toLowerCase().trim() : "";

    let precioMin = precioMinInput !== "" ? parseInt(precioMinInput) : 0;
    let precioMax = precioMaxInput !== "" ? parseInt(precioMaxInput) : Infinity;

    let tarjetas = document.querySelectorAll("#grilla-productos .product-card");
    let tarjetasVisibles = 0;

    for (let i = 0; i < tarjetas.length; i++) {
        let card = tarjetas[i];
        let catTexto = card.querySelector(".product-category") ? card.querySelector(".product-category").textContent.trim() : "";
        let catNormalizada = normalizarCategoria(catTexto);

        let precioTexto = card.querySelector(".product-price") ? card.querySelector(".product-price").textContent : "";
        let precio = parseInt(precioTexto.replace(/\D/g, "")) || 0;

        let textoTarjeta = card.textContent.toLowerCase();

        let cumpleCategoria = (catSeleccionada === "todos") || (catNormalizada === catSeleccionada);
        let cumplePrecio = (precio >= precioMin) && (precio <= precioMax);
        let cumpleBusqueda = (textoBusqueda === "") || textoTarjeta.includes(textoBusqueda);

        if (cumpleCategoria && cumplePrecio && cumpleBusqueda) {
            card.style.display = "";
            tarjetasVisibles++;
        } else {
            card.style.display = "none";
        }
    }

    let contador = document.querySelector(".results-count");
    if (contador) {
        contador.textContent = "Mostrando " + tarjetasVisibles + " producto(s)";
    }
}

// Normalizar nombres de categorias
function normalizarCategoria(texto) {
    let t = texto.toLowerCase().trim();
    if (t.includes("notebook")) return "notebooks";
    if (t.includes("periférico") || t.includes("periferico")) return "perifericos";
    if (t.includes("monitor")) return "monitores";
    if (t.includes("componente")) return "componentes";
    return "todos";
}

// Control del menu de usuario en la barra superior
function actualizarSesionHeader() {
    let sesion = JSON.parse(localStorage.getItem("usuarioSesion"));
    let navLoginItem = document.getElementById("navLoginItem");
    let navProfileItem = document.getElementById("navProfileItem");
    let navUserName = document.getElementById("navUserName");
    let btnLogout = document.getElementById("btnLogout");

    if (sesion && (sesion.nombre || sesion.usuario)) {
        if (navLoginItem) navLoginItem.style.display = "none";
        if (navProfileItem) navProfileItem.style.display = "inline-flex";
        if (navUserName) navUserName.textContent = sesion.nombre || sesion.usuario;
    } else {
        if (navLoginItem) navLoginItem.style.display = "block";
        if (navProfileItem) navProfileItem.style.display = "none";
    }

    if (btnLogout) {
        btnLogout.onclick = function() {
            localStorage.removeItem("usuarioSesion");
            window.location.reload();
        };
    }
}