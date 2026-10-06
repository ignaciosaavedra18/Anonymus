import React from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import ProductoCard from '../components/ProductCard'

const producto = {
  id: 500,
  nombre: 'Teclado de prueba',
  categoria: 'perifericos',
  precio: 39990,
  img: '/images/Teclado Logitech G915.jpg'
}

describe('ProductoCard', () => {
  let container
  let root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(() => {
    root.unmount()
    container.remove()
  })

  it('debe mostrar el nombre recibido por props', () => {
    root.render(<MemoryRouter><ProductoCard product={producto} /></MemoryRouter>)
    expect(container.textContent).toContain('Teclado de prueba')
  })

  it('debe mostrar el botón de agregar al carrito', () => {
    root.render(<MemoryRouter><ProductoCard product={producto} /></MemoryRouter>)
    expect(container.querySelector('.btn-primary')).not.toBeNull()
  })

  it('debe ejecutar la función al hacer clic', () => {
    spyOn(localStorage, 'setItem').and.callThrough()
    root.render(<MemoryRouter><ProductoCard product={producto} /></MemoryRouter>)
    container.querySelector('.btn-primary').click()
    expect(localStorage.setItem).toHaveBeenCalled()
  })
})
