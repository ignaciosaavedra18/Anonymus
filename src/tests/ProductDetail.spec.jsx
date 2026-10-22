import React from 'react'
import { botonConTexto, clic, montar, simularLocalStorage } from './ayudas'
import ProductDetail from '../pages/ProductDetail'

describe('ProductDetail', () => {
  let pagina
  let memoria
  function abrirProducto(id) {
    memoria = simularLocalStorage()
    pagina = montar(<ProductDetail />, { ruta: `/producto/${id}`, patron: '/producto/:id' })
  }

  afterEach(() => pagina.desmontar())

  it('debe mostrar el nombre y el precio del producto pedido en la dirección', () => {
    abrirProducto(1)
    expect(pagina.contenedor.querySelector('h1').textContent).toBe('ASUS TUF Gaming A15')
    expect(pagina.contenedor.querySelector('.detalle-precio').textContent).toContain('$719.990')
  })

  it('debe mostrar el precio anterior cuando el producto está en oferta', () => {
    abrirProducto(2)
    expect(pagina.contenedor.querySelector('.old-price')).not.toBeNull()
  })
  it('no debe mostrar precio anterior cuando el producto no está en oferta', () => {
    abrirProducto(1)
    expect(pagina.contenedor.querySelector('.old-price')).toBeNull()
  })
  it('debe avisar cuando el producto no existe', () => {
    abrirProducto(9999)
    expect(pagina.contenedor.textContent).toContain('Producto no encontrado')
    })
    it('debe agregar el producto al carrito y avisar al resto de la aplicación',()=>{
        const avisoDeCarrito = jasmine.createSpy('cartUpdated')
        window.addEventListener('cartUpdated', avisoDeCarrito)
        abrirProducto(1)
        clic(botonConTexto(pagina.contenedor, 'Agregar al carrito'))
        window.removeEventListener('cartUpdated', avisoDeCarrito)

    const carrito = JSON.parse(memoria.tecnoShopCart)
    expect(carrito.length).toBe(1)
    expect(carrito[0].id).toBe(1)
    expect(avisoDeCarrito).toHaveBeenCalled()
  })
})
