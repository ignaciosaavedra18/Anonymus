import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import ProductoCard from '../components/ProductCard'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

const producto = {
  id: 500,
  nombre: 'Teclado de prueba',
  categoria: 'perifericos',
  precio: 39990,
  img: '/images/Teclado Logitech G915.jpg'
}

describe('ProductoCard', () => {
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

  function mostrarTarjeta() {
    act(() => {
      raiz.render(<MemoryRouter><ProductoCard product={producto} /></MemoryRouter>)
    })
  }

  it('debe mostrar el nombre recibido por props', () => {
    mostrarTarjeta()
    expect(contenedor.textContent).toContain('Teclado de prueba')
  })

  it('debe mostrar el botón de agregar al carrito', () => {
    mostrarTarjeta()
    expect(contenedor.querySelector('.btn-primary')).not.toBeNull()
  })

  it('debe ejecutar la función al hacer clic', () => {
    spyOn(localStorage, 'setItem').and.callThrough()
    mostrarTarjeta()
    act(() => {
      contenedor.querySelector('.btn-primary').click()
    })
    expect(localStorage.setItem).toHaveBeenCalled()
  })
})