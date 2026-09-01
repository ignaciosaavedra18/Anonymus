# Tecnoshop

Tienda online de tecnología (computadores, celulares, tablets, smartwatches,
monitores, audífonos y accesorios). Aplicación 100% frontend: HTML + TypeScript
con Vite, **sin backend ni microservicios**. Los datos (productos, usuarios y
pedidos) viven en archivos JSON locales y se persisten en el navegador con
`localStorage`.

## Cómo ejecutar el proyecto

Requiere [Node.js](https://nodejs.org/) 18 o superior.

```bash
cd tecnoshop
npm install       # instala dependencias (leaflet, vite, typescript)
npm run dev       # servidor de desarrollo con recarga en caliente
```

Abre la URL que muestra la terminal (normalmente http://localhost:5173).

Para generar la build de producción (ya incluida en la carpeta `dist/` de
este entrega, pero puedes regenerarla):

```bash
npm run build     # compila TypeScript y genera dist/
npm run preview   # sirve la build de producción localmente
```

La carpeta `dist/` es autocontenida: puedes subirla tal cual a cualquier
hosting estático (GitHub Pages, Netlify, Vercel, un servidor Apache/Nginx, etc.).

## Estructura del proyecto

```
tecnoshop/
├── index.html              Punto de entrada HTML
├── src/
│   ├── main.ts              Arranque de la app y router
│   ├── router.ts            Router basado en hash (#/ruta)
│   ├── types.ts             Tipos TypeScript del dominio
│   ├── style.css            Sistema de diseño y estilos
│   ├── data/                 Datos semilla (100 registros)
│   │   ├── products.json     56 productos
│   │   ├── users.json        20 usuarios
│   │   └── orders.json       24 pedidos
│   ├── state/store.ts        Persistencia en localStorage (carrito, sesión, CRUD)
│   ├── components/           Header, footer, tarjeta de producto
│   ├── views/                Una vista por página (catálogo, producto, carrito...)
│   └── utils/format.ts       Formato de moneda CLP y estados de pedido
├── scripts/gen_data.py       Script usado para generar los datos semilla
└── public/favicon.svg
```

## Funcionalidades

- **Catálogo** con búsqueda, filtros (categoría, marca, rango de precio) y orden.
- **Detalle de producto** con specs, stock y productos relacionados.
- **Carrito de compras** persistente (localStorage).
- **Checkout** con resumen y confirmación de pedido.
- **Mis pedidos** con seguimiento visual por etapas (pendiente → confirmado →
  en preparación → enviado → entregado).
- **Login / registro** de usuarios (cuentas de prueba en `src/data/users.json`,
  contraseña `Demo1234` para todas).
- **Panel de administración** (solo rol `administrador`): editar precio/stock,
  agregar productos y cambiar el estado de los pedidos.
- **Contacto y soporte** con mapa interactivo (Leaflet/OpenStreetMap) mostrando
  la ubicación de la tienda.

## Cuentas de prueba

Todas las cuentas semilla usan la contraseña `Demo1234`. Revisa
`src/data/users.json` para ver los correos disponibles; hay usuarios con rol
`cliente`, `administrador` y `soporte`. Ejemplo:

- `ignacio.saavedra@tecnoshop.cl` — cliente
- Busca en el JSON el primer usuario con `"role": "administrador"` para
  probar el panel de administración.

## Notas sobre los datos

- Los 100 registros exigidos por el proyecto están distribuidos así:
  **56 productos + 20 usuarios + 24 pedidos = 100**.
- Como no hay backend, todo cambio (nuevo pedido, edición de stock, registro
  de usuario) se guarda en el `localStorage` del navegador. Para reiniciar los
  datos a su estado original, abre la consola del navegador y ejecuta:
  `localStorage.clear()` y recarga la página.
