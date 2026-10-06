# Documento de cobertura y testing

## Herramientas

- Jasmine: define las pruebas y las expectativas.
- Karma: ejecuta las pruebas en un navegador headless.
- Karma Coverage: genera el reporte de cobertura.
- Jasmine Spies: se usan para comprobar acciones como guardar datos en `localStorage`.

## Casos realizados

### ProductoService

- carga del catálogo inicial
- creación de producto
- actualización de producto
- eliminación de producto

### ProductoCard

- recibe y muestra props
- renderiza correctamente
- contiene el botón de agregar al carrito
- ejecuta lógica al hacer clic

## Ejecución

```bash
npm test
```

El resultado muestra el estado de cada prueba en la consola y genera `coverage/`.
