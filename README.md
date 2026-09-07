# TecnoShop

Tienda online de tecnología (notebooks, componentes, monitores y periféricos gamer), desarrollada como proyecto del ramo **DSY1104 – Ingeniería de Requisitos**.

## Integrantes

- Kevin Aguilera
- Ignacio Saavedra
- Joaquín Cárdenas

## Descripción

TecnoShop es una aplicación **100% frontend**: no tiene backend ni base de datos propia. Todo el catálogo, el carrito de compras y la sesión del usuario se manejan directamente en el navegador usando **JavaScript vanilla** y **`localStorage`**.

La idea del proyecto es simular el comportamiento de una tienda online real (catálogo, carrito, login, panel de administración) sin depender de un servidor, cumpliendo los requerimientos funcionales y no funcionales definidos en la etapa de levantamiento de requisitos del ramo.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (vanilla, sin frameworks)
- `localStorage` del navegador como mecanismo de persistencia

## Estructura del proyecto

```
Anonymus-main/
├── index.html              Página de inicio (carrusel de productos)
├── productos.html           Catálogo con búsqueda y filtros
├── login.html / registro.html   Autenticación de usuarios
├── carrito.html             Carrito de compras
├── perfil.html               Datos y perfil del usuario
├── contacto.html             Formulario de contacto y soporte
├── blogs.html                 Novedades y artículos
├── admin/                     Panel de administración
│   ├── productos.html
│   ├── producto_formulario.html
│   └── usuarios.html
├── src/                        Vistas de detalle
│   ├── producto_detalle.html
│   └── detalle_blog.html
├── css/style.css              Estilos generales
└── js/
    ├── main.js                 Catálogo, carrusel y filtros
    ├── carrito.js               Lógica del carrito de compras
    └── validaciones.js          Validación de formularios (RUT, región/comuna)
```

## Funcionalidades principales

- **Catálogo de productos** con búsqueda por palabra clave y filtros por categoría y rango de precio.
- **Detalle de producto** con especificaciones, precio y stock.
- **Carrito de compras** persistente en `localStorage` (se agregan, modifican y eliminan productos).
- **Registro e inicio de sesión** de usuarios, con validación de RUT chileno y campos obligatorios.
- **Perfil de usuario** para ver y editar los datos personales.
- **Panel de administración** para gestionar productos (crear, editar, eliminar) y usuarios.
- **Formulario de contacto/soporte**.
- **Sección de blogs** con novedades y consejos.

## Actores del sistema

| Actor | Descripción |
|---|---|
| Cliente | Usuario que navega el catálogo, compra y gestiona su perfil. |
| Administrador | Usuario con permisos para gestionar productos y usuarios desde el panel admin. |

## Cómo ejecutar el proyecto

Al ser un proyecto 100% frontend, no requiere instalación de dependencias ni servidor backend:

1. Descargar o clonar el repositorio.
2. Abrir el archivo `index.html` directamente en el navegador (o servirlo con una extensión tipo "Live Server").
3. Navegar libremente por el catálogo, agregar productos al carrito, registrarse e iniciar sesión.

> Nota: al no existir backend, los datos (carrito, sesión, usuarios agregados) se guardan en el `localStorage` del navegador. Para reiniciar el estado, hay que limpiar el `localStorage` del sitio.

## Notas para la presentación

- El proyecto no usa frameworks: cada página HTML es independiente y la lógica de negocio vive en los archivos JavaScript (`main.js`, `carrito.js`, `validaciones.js`).
- Como no hay backend, todo el "estado" de la aplicación (catálogo extra, carrito, sesión activa) se guarda en `localStorage`, por lo que los cambios son locales al navegador de cada usuario.
