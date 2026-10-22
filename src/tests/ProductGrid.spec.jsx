import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

const productosPrueba = [
  { id: 1, nombre: 'Notebook A', categoria: 'notebooks', precio: 500000 },
  { id: 2, nombre: 'Audífonos B', categoria: 'perifericos', precio: 30000 },
  { id: 3, nombre: 'Monitor C', categoria: 'monitores', precio: 150000, oferta: true, precioAnterior: 170000 }
]

describe('ProductGrid', () => {
  let contenedor
  let raiz

  beforeEach(() => {
    contenedor = document.createElement('div')
    document.body.appendChild(contenedor)
    raiz = createRoot(contenedor)
  })

  afterEach(() => {
    act(() => raiz.unmount())
    contenedor.remove()
  })

  function mostrarGrilla(productos) {
    act(() => {
      raiz.render(<MemoryRouter><ProductGrid products={productos} /></MemoryRouter>)
    })
  }

  it('debe mostrar una tarjeta por cada producto recibido', () => {
    mostrarGrilla(productosPrueba)
    expect(contenedor.querySelectorAll('.product-card').length).toBe(3)
  })

  it('debe mostrar un mensaje cuando no hay productos', () => {
    mostrarGrilla([])
    expect(contenedor.querySelectorAll('.product-card').length).toBe(0)
    expect(contenedor.textContent).toContain('No se encontraron productos')
  })

  it('debe mostrar la etiqueta Oferta solo en el producto con descuento', () => {
    mostrarGrilla(productosPrueba)
    expect(contenedor.querySelectorAll('.card-badge').length).toBe(1)
  })
})