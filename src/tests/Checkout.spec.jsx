import React from 'react'
import { botonConTexto, campoDeEtiqueta, clic, escribir, montar, simularLocalStorage } from './ayudas'
import Checkout from '../pages/Checkout'

const carrito = [
  { id: 1, nombre: 'Teclado', precio: 10000, img: '/teclado.png', cantidad: 2 },
  { id: 2, nombre: 'Mouse', precio: 5000, img: '/mouse.png', cantidad: 1 }
]

describe('Checkout', () => {
  let pagina
  let memoria

  function abrirConCarrito(productos) {
    memoria = simularLocalStorage({ tecnoShopCart: JSON.stringify(productos) })
    pagina = montar(<Checkout />, { ruta: '/checkout' })
  }

  afterEach(() => pagina.desmontar())

  it('debe avisar que no hay productos si el carrito está vacío', () => {
    abrirConCarrito([])
    expect(pagina.contenedor.textContent).toContain('No tienes productos para comprar')
  })

  it('debe mostrar el total a pagar', () => {
    abrirConCarrito(carrito)
    expect(pagina.contenedor.textContent).toContain('Total: $25.000')
  })

  it('debe mostrar un error y conservar el carrito si faltan datos de entrega', () => {
    abrirConCarrito(carrito)
    clic(botonConTexto(pagina.contenedor, 'Confirmar compra'))
    expect(pagina.contenedor.querySelector('.alert-danger').textContent).toContain('Completa todos los datos')
    expect(memoria.tecnoShopCart).toBeDefined()
    expect(pagina.rutaActual()).toBe('/checkout')
  })

  it('debe actualizar el tipo de entrega cuando el usuario lo cambia', () => {
    abrirConCarrito(carrito)
    escribir(campoDeEtiqueta(pagina.contenedor, 'Entrega'), 'retiro')
    expect(campoDeEtiqueta(pagina.contenedor, 'Entrega').value).toBe('retiro')
  })

  it('debe vaciar el carrito y mostrar la compra exitosa cuando los datos están completos', () => {
    abrirConCarrito(carrito)
    escribir(campoDeEtiqueta(pagina.contenedor, 'Nombre completo'), 'Ana Pérez')
    escribir(campoDeEtiqueta(pagina.contenedor, 'Teléfono'), '912345678')
    escribir(campoDeEtiqueta(pagina.contenedor, 'Dirección'), 'Los Cristales 123')
    escribir(campoDeEtiqueta(pagina.contenedor, 'Comuna'), 'Cerrillos')
    clic(botonConTexto(pagina.contenedor, 'Confirmar compra'))
    expect(memoria.tecnoShopCart).toBeUndefined()
    expect(pagina.rutaActual()).toBe('/compra-exitosa')
  })

  it('debe ofrecer el enlace para simular un pago rechazado', () => {
    abrirConCarrito(carrito)
    expect(pagina.contenedor.querySelector('a[href="/compra-fallida"]')).not.toBeNull()
  })
})
