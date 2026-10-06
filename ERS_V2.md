# ERS V2 - Resumen frontend

## Objetivo
Actualizar TecnoShop para la Evaluación 2 manteniendo la propuesta visual del proyecto anterior y agregando navegación, persistencia y pruebas.

## Requerimientos incorporados

1. Migración de las vistas principales a componentes React.
2. Uso de props y estado en componentes como `ProductoCard`, catálogo, carrito y formularios.
3. Persistencia mediante `localStorage`.
4. CRUD de productos para administración.
5. Vistas de categorías y ofertas.
6. Flujo de carrito, checkout y resultado de compra.
7. Bootstrap para responsive en las nuevas vistas.
8. Pruebas unitarias con Jasmine y Karma.

## Componentes principales

- `Header`
- `Footer`
- `Layout`
- `ProductCard`
- `ProductGrid`

## Servicios

- `productService.js`: lectura, creación, actualización y eliminación.
- `cartService.js`: carrito y persistencia.
