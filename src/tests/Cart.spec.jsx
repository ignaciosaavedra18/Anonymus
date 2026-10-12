import React from 'react'
import { clic, montar, simularLocalStorage } from './ayudas'
import Cart from '../pages/Cart'

const teclado = { id: 1, nombre: 'Teclado', precio: 10000, img: '/teclado.png', cantidad: 2 }
const mouse = { id: 2, nombre: 'Mouse', precio: 5000, img: '/mouse.png', cantidad: 1 }

describe('Cart (página)', () => {
  let pagina

  function abrirConCarrito(carrito) {
    simularLocalStorage({ tecnoShopCart: JSON.stringify(carrito) })
    pagina = montar(<Cart />)
  }

  afterEach(() => pagina.desmontar())

  it('debe mostrar el mensaje de carrito vacío cuando no hay productos', () => {
    abrirConCarrito([])
    expect(pagina.contenedor.textContent).toContain('Tu carrito está vacío')
  })

  it('debe mostrar una fila por producto y el total del carrito', () => {
    abrirConCarrito([teclado, mouse])
    expect(pagina.contenedor.querySelectorAll('tbody tr').length).toBe(2)
    expect(pagina.contenedor.querySelector('.summary-total').textContent).toContain('$25.000')
  })

  it('debe aumentar la cantidad y actualizar el total al presionar +', () => {
    abrirConCarrito([teclado, mouse])
    clic(pagina.contenedor.querySelectorAll('.qty-stepper button')[1])
    expect(pagina.contenedor.querySelector('.summary-total').textContent).toContain('$35.000')
  })

  it('debe quitar el producto al bajar su cantidad a cero con −', () => {
    abrirConCarrito([teclado, mouse])
    clic(pagina.contenedor.querySelectorAll('.qty-stepper button')[2])
    expect(pagina.contenedor.querySelectorAll('tbody tr').length).toBe(1)
    expect(pagina.contenedor.textContent).not.toContain('Mouse')
  })

  it('debe eliminar un producto con el botón de eliminar y mostrar el carrito vacío', () => {
    abrirConCarrito([mouse])
    clic(pagina.contenedor.querySelector('[aria-label="Eliminar Mouse"]'))
    expect(pagina.contenedor.textContent).toContain('Tu carrito está vacío')
  })

  it('debe enlazar el botón Continuar compra con el checkout', () => {
    abrirConCarrito([mouse])
    expect(pagina.contenedor.querySelector('a[href="/checkout"]')).not.toBeNull()
  })
})
