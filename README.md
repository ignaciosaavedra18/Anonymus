# TecnoShop - Evaluación 2

Proyecto frontend de la tienda TecnoShop. Esta versión mantiene el diseño y los recursos del proyecto original y agrega la estructura React solicitada para la Evaluación 2.

## Tecnologías

- React
- React Router
- Bootstrap 5
- Vite
- Jasmine
- Karma
- localStorage

## Ejecutar

```bash
npm install
npm run dev
```

Abrir la dirección `Local` que muestre Vite.

## Pruebas

```bash
npm test
```

El reporte de cobertura se genera en la carpeta `coverage/`.

## Estructura principal

```text
src/
  components/   Componentes reutilizables
  data/         Datos iniciales de productos
  pages/        Vistas de la aplicación
  services/     Persistencia, CRUD y carrito
  tests/        Pruebas Jasmine/Karma
  App.jsx
  main.jsx
  styles.css
public/
  images/       Imágenes originales
  css/          CSS original respaldado
legacy/         Proyecto HTML/CSS/JS original completo
```

La carpeta `legacy/` conserva la versión original para no perder el trabajo anterior y para poder revisar las páginas que existían antes de la migración a React.
