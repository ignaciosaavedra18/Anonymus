# TecnoShop – Evaluación Parcial 2 (DSY1104 Desarrollo Full Stack II)

Tienda online de tecnología (notebooks, periféricos, monitores y componentes) desarrollada como **frontend en React**. Es la migración de la tienda original en HTML, CSS y JavaScript a una aplicación con componentes reutilizables, navegación entre vistas, diseño responsivo con Bootstrap y **pruebas unitarias con Jasmine y Karma**.

> La versión HTML original se conserva completa en la carpeta [`legacy/`](legacy/) para no perder el trabajo anterior.

---

## Contenido

1. [Qué hace la aplicación](#1-qué-hace-la-aplicación)
2. [Tecnologías](#2-tecnologías)
3. [Requisitos e instalación](#3-requisitos-e-instalación)
4. [Scripts disponibles](#4-scripts-disponibles)
5. [Rutas de la aplicación](#5-rutas-de-la-aplicación)
6. [Estructura del proyecto](#6-estructura-del-proyecto)
7. [Cómo funcionan los datos](#7-cómo-funcionan-los-datos)
8. [Cómo está hecho el frontend](#8-cómo-está-hecho-el-frontend)
9. [Pruebas unitarias y cobertura](#9-pruebas-unitarias-y-cobertura)
10. [Integración continua y despliegue](#10-integración-continua-y-despliegue)
11. [Limitaciones conocidas y trabajo pendiente](#11-limitaciones-conocidas-y-trabajo-pendiente)
12. [Documentación del proyecto](#12-documentación-del-proyecto)

---

## 1. Qué hace la aplicación

| Área | Funcionalidad |
|---|---|
| **Catálogo** | Lista de productos con búsqueda por texto, filtro por categoría y filtro por precio máximo |
| **Categorías y ofertas** | Vista por categoría y vista con solo los productos en oferta |
| **Detalle de producto** | Imagen, categoría, precio, precio anterior (si está en oferta) y botón para agregar al carrito |
| **Carrito** | Agregar, aumentar o disminuir cantidad, eliminar productos y ver el total. Un contador en el encabezado se actualiza en tiempo real |
| **Checkout** | Formulario de datos de entrega con validación. Al confirmar, vacía el carrito y muestra la pantalla de compra exitosa |
| **Resultado de compra** | Pantalla de compra realizada (con total) y pantalla de pago rechazado |
| **Cuenta** | Registro, inicio de sesión, perfil editable y cierre de sesión |
| **Panel de administración** | CRUD de productos (crear, editar, eliminar) |
| **Páginas informativas** | Inicio, nosotros, blogs y contacto |

## 2. Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.3.0 | Componentes, propiedades (props) y estados (hooks) |
| React Router DOM | 7.18.4 | Navegación entre vistas |
| Bootstrap | 5.3.8 | Diseño responsivo (grilla, formularios, tablas) |
| Vite | 8.3.2 | Servidor de desarrollo y compilación |
| Jasmine | 5.9.0 | Escritura de pruebas unitarias |
| Karma | 6.4.4 | Ejecución de las pruebas en Chrome headless |
| karma-coverage / babel-plugin-istanbul | 2.2.1 / 7.0.0 | Medición de cobertura |
| karma-webpack, babel-loader | 5.0.1 / 10.0.0 | Compilar JSX dentro de las pruebas |

## 3. Requisitos e instalación

**Necesitas:**

- **Node.js 20.19 o superior** (Vite 8 lo exige; el workflow de GitHub usa Node 24).
- **Google Chrome instalado**, porque Karma lo usa en modo headless para correr las pruebas.

**Pasos:**

```bash
git clone https://github.com/ignaciosaavedra18/Anonymus.git
cd Anonymus
npm install
npm run dev
```

Abre la dirección `Local` que muestre Vite (normalmente `http://localhost:5173/Anonymus/`).

> **Importante:** la aplicación usa la base `/Anonymus/` (ver `vite.config.js`), para que funcione al publicarse en GitHub Pages. Navega con los enlaces del menú; escribir una ruta a mano en el navegador puede llevarte al inicio (ver [limitaciones](#11-limitaciones-conocidas-y-trabajo-pendiente)).

La carpeta `node_modules/` se genera con `npm install` y no se sube a GitHub.

## 4. Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la carpeta `dist/` |
| `npm test` | Ejecuta todas las pruebas con Karma y muestra el resumen de cobertura |
| `npm run test:coverage` | Igual que `npm test`, con ejecución única (lo usa la integración continua) |

## 5. Rutas de la aplicación

| Ruta | Página | Archivo |
|---|---|---|
| `/` | Inicio | `src/pages/Home.jsx` |
| `/productos` | Catálogo con filtros | `src/pages/Products.jsx` |
| `/categorias` | Categorías | `src/pages/Categories.jsx` |
| `/ofertas` | Productos en oferta | `src/pages/Offers.jsx` |
| `/producto/:id` | Detalle de un producto | `src/pages/ProductDetail.jsx` |
| `/carrito` | Carrito de compras | `src/pages/Cart.jsx` |
| `/checkout` | Datos de entrega y pago | `src/pages/Checkout.jsx` |
| `/compra-exitosa` | Compra realizada | `src/pages/PurchaseResult.jsx` |
| `/compra-fallida` | Pago rechazado | `src/pages/PurchaseResult.jsx` |
| `/login` | Iniciar sesión | `src/pages/Login.jsx` |
| `/registro` | Crear cuenta | `src/pages/Register.jsx` |
| `/perfil` | Mi perfil | `src/pages/Profile.jsx` |
| `/admin` | Panel de administración | `src/pages/Admin.jsx` |
| `/blogs` | Blogs | `src/pages/Blogs.jsx` |
| `/contacto` | Contacto | `src/pages/Contact.jsx` |
| `/nosotros` | Nosotros | `src/pages/About.jsx` |

Las rutas están definidas en `src/App.jsx`. Cualquier ruta desconocida muestra el inicio.

## 6. Estructura del proyecto

```text
Anonymus/
├── .github/workflows/
│   └── deploi.yml            Pruebas, build y publicación en GitHub Pages
├── public/
│   └── images/               Imágenes de los productos
├── legacy/                   Proyecto HTML/CSS/JS original (sin modificar)
├── src/
│   ├── assets/               Logo de la tienda
│   ├── components/           Componentes reutilizables
│   │   ├── Header.jsx        Menú, buscador, sesión y contador del carrito
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx        Estructura común: Header + contenido + Footer
│   │   ├── ProductCard.jsx   Tarjeta de un producto
│   │   └── ProductGrid.jsx   Lista de tarjetas (o mensaje si no hay productos)
│   ├── data/
│   │   └── productos.js      Fuente de datos simulada (catálogo inicial)
│   ├── pages/                Una vista por ruta (ver tabla anterior)
│   ├── services/
│   │   ├── productService.js CRUD de productos
│   │   └── cartService.js    Lógica del carrito
│   ├── tests/                Pruebas Jasmine/Karma (ver sección 9)
│   ├── App.jsx               Definición de rutas
│   ├── main.jsx              Punto de entrada (Router + Bootstrap + estilos)
│   └── styles.css            Estilos propios de la tienda
├── babel.config.cjs          Configuración de Babel (JSX y cobertura)
├── karma.conf.cjs            Configuración de Karma y webpack
├── vite.config.js            Configuración de Vite (base /Anonymus/)
└── package.json
```

## 7. Cómo funcionan los datos

No hay backend en esta evaluación. Los datos se simulan en el navegador:

- **`src/data/productos.js`** actúa como "base de datos" inicial con el catálogo.
- **`src/services/`** concentra la lógica. Los componentes no tocan `localStorage` directamente; llaman a funciones del servicio.

**`productService.js`**: `getProducts`, `getProductById`, `createProduct`, `updateProduct`, `deleteProduct`.
Los productos creados desde el panel se guardan junto al catálogo inicial. Solo los productos creados desde el panel se pueden editar o eliminar.

**`cartService.js`**: `getCart`, `addToCart`, `changeQuantity`, `removeFromCart`, `clearCart`, `cartTotal`, `cartCount`.

**Claves usadas en `localStorage`:**

| Clave | Contenido |
|---|---|
| `Catalago` | Productos creados desde el panel de administración |
| `tecnoShopCart` | Productos del carrito con su cantidad |
| `usuarios` | Usuarios registrados |
| `usuarioActivo` | Usuario con sesión iniciada |

**Comunicación entre componentes:** cuando algo cambia, se dispara un evento de la ventana (`cartUpdated`, `authUpdated`) y el `Header` lo escucha para refrescar el contador del carrito y el estado de la sesión.

## 8. Cómo está hecho el frontend

- **Componentes con una sola responsabilidad.** Por ejemplo, `ProductCard` dibuja un producto y `ProductGrid` dibuja una lista de tarjetas; `Layout` solo arma la estructura de la página.
- **Props.** Los datos bajan de padre a hijo (`ProductGrid` recibe `products` y se los pasa a cada `ProductCard`; `PurchaseResult` recibe `success`).
- **Estado con hooks.** `useState` guarda los campos de los formularios, los filtros del catálogo y el carrito; `useEffect` registra y limpia los eventos del `Header` y del carrito; `useMemo` calcula la lista filtrada del catálogo.
- **Navegación.** `react-router-dom` con `Routes`, `Link`/`NavLink`, `useNavigate` (redirigir tras iniciar sesión o comprar), `useParams` (detalle de producto) y `useSearchParams` (filtros desde la dirección).
- **Diseño responsivo.** Se usa la grilla de Bootstrap (`row`, `col-12`, `col-md-*`, `col-lg-*`) en el catálogo, el carrito, el checkout, el perfil y el panel de administración; las tablas usan `table-responsive`. Los estilos propios están en `src/styles.css`.

## 9. Pruebas unitarias y cobertura

### Herramientas

- **Jasmine**: define las pruebas (`describe`, `it`, `expect`) y los *spies* (`spyOn`, `jasmine.createSpy`).
- **Karma**: abre Chrome en modo headless y ejecuta las pruebas.
- **karma-webpack + babel-loader**: compilan el JSX de los componentes dentro de las pruebas.
- **karma-coverage + babel-plugin-istanbul**: miden qué líneas del código ejecutaron las pruebas.

### Ejecutar

```bash
npm test
```

Resultado esperado: una línea `TOTAL: N SUCCESS` y un resumen de cobertura (sentencias, ramas, funciones y líneas). El informe detallado en HTML queda en `coverage/` (no se sube a GitHub).

### Qué se prueba

| Archivo en `src/tests/` | Qué verifica |
|---|---|
| `cartService.spec.jsx` | Lógica del carrito: agregar, aumentar cantidad, total, quitar con cantidad cero, eliminar y limpiar |
| `productService.spec.jsx` | CRUD de productos |
| `ProductoCard.spec.jsx` | Renderizado, props y clic del botón |
| `ProductGrid.spec.jsx` | Una tarjeta por producto, mensaje con lista vacía, etiqueta de oferta |
| `Admin.spec.jsx` | Panel: validación, crear, editar y eliminar (con confirmación) |
| `Cart.spec.jsx` | Carrito vacío, filas y total, botones + y −, eliminar |
| `Products.spec.jsx` | Filtros de búsqueda, categoría y precio, Limpiar y `?q=` |
| `Login.spec.jsx` / `Register.spec.jsx` | Errores de formulario, inicio de sesión y registro |
| `Checkout.spec.jsx` | Validación de datos, total, compra exitosa |
| `Profile.spec.jsx` | Mostrar y guardar los datos del usuario |
| `ProductDetail.spec.jsx` | Detalle, precio anterior, producto inexistente, agregar al carrito |
| `Header.spec.jsx` | Sesión, contador del carrito, cierre de sesión y buscador |
| `PaginasInformativas.spec.jsx` | Categorías, ofertas, inicio, contacto, resultado de compra, nosotros, blogs y layout |

### Conceptos aplicados

- **Renderizado:** se monta el componente en el DOM y se revisa el HTML resultante.
- **Renderizado condicional:** mensajes que aparecen solo cuando corresponde (error, lista vacía, etiqueta de oferta).
- **Props:** se pasa un dato al componente y se comprueba que lo muestra.
- **Estado:** se escribe en un campo y se verifica que el formulario se actualiza.
- **Eventos:** se simulan clics y envíos de formulario y se comprueba la reacción.
- **Mocks y spies:** `localStorage` se reemplaza por un objeto en memoria (así las pruebas no dependen del navegador ni dejan datos guardados), y se usan *spies* para comprobar que se avisa con `cartUpdated` o `authUpdated`.

### Archivos de apoyo (no son pruebas)

- `src/tests/ayudas.jsx`: funciones compartidas (`montar`, `escribir`, `clic`, `simularLocalStorage`, etc.). Debe existir, porque varias pruebas lo importan.
- `src/tests/cargarTodoElCodigo.spec.jsx`: carga todos los archivos de `components`, `pages`, `services` y `data` para que la cobertura cuente **también los archivos sin pruebas**. Sin él, Karma solo mediría los archivos que las pruebas importan y el porcentaje saldría inflado.

### Nota sobre React 19

React 19 dibuja de forma asíncrona. Por eso las pruebas de componentes envuelven el render y los eventos en `act(...)` y declaran `globalThis.IS_REACT_ACT_ENVIRONMENT = true`.

### Cómo leer la cobertura

La cobertura mide **qué líneas se ejecutaron**, no que el comportamiento sea correcto. `App.jsx` y `main.jsx` no se incluyen en la medición, por lo que las rutas no están cubiertas por pruebas.

## 10. Integración continua y despliegue

El archivo `.github/workflows/deploi.yml` se ejecuta en cada *push* a `main`:

1. Instala las dependencias (`npm ci`).
2. Ejecuta las pruebas con cobertura usando Karma (`npm run test:coverage`).
3. Sube el informe de cobertura como artefacto.
4. Compila el proyecto (`npm run build`).
5. Publica `dist/` en **GitHub Pages**.

Para que la publicación funcione, en el repositorio debe estar configurado **Settings → Pages → Source: GitHub Actions**.

## 11. Limitaciones conocidas y trabajo pendiente

Esta versión es una entrega parcial. Lo siguiente **todavía no está resuelto**:

- **Login:** acepta cualquier correo y no valida la contraseña.
- **Registro:** no valida largo de contraseña ni correo duplicado, y guarda la contraseña sin cifrar en `localStorage` (solo aceptable en una simulación académica).
- **Roles y rutas protegidas:** `/admin` no está protegido; cualquiera puede entrar.
- **Panel de usuarios:** el panel de administración solo gestiona productos.
- **Checkout:** el formulario no incluye apellidos, correo, región y comuna del diseño propuesto; el pago rechazado es un enlace de simulación, no un flujo real.
- **Carrito:** no controla stock ni tiene botón para limpiar todo el carrito.
- **Menú en móvil:** el encabezado no tiene menú hamburguesa; en pantallas muy angostas los enlaces quedan fuera de pantalla.
- **Rutas escritas a mano:** el `BrowserRouter` no tiene `basename`, por lo que abrir una dirección directa bajo `/Anonymus/` lleva al inicio. Navega con los enlaces.
- **Blog:** el enlace "Leer más" apunta a `/blogs/:id`, que aún no existe.
- **Imagen por defecto:** los productos creados sin imagen usan `/images/LogoTienda.jpg`, que no existe en `public/images/`.

## 12. Documentación del proyecto

- [`ERS_V2.md`](ERS_V2.md): resumen de requisitos de la entrega.
- [`TESTING.md`](TESTING.md): resumen del testing.
- [`CAMBIOS_ENTREGA2.md`](CAMBIOS_ENTREGA2.md): cambios respecto a la entrega anterior.
- `src/tests/README.md`: notas sobre las pruebas.
- El **Documento de cobertura de testing** y el **ERS** completos se entregan como archivos Word aparte.
