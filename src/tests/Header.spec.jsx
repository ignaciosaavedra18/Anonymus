import React, { act } from 'react'
import { clic, enviarFormulario, escribir, montar, simularLocalStorage } from './ayudas'
import Header from '../components/Header'

const carrito = [
  { id: 1, nombre: 'Teclado', precio: 10000, img: '/teclado.png', cantidad: 2 },
  { id: 2, nombre: 'Mouse', precio: 5000, img: '/mouse.png', cantidad: 1 }
]

describe('Header', () => {
  let pagina
  let memoria

  function abrir(datos) {
    memoria = simularLocalStorage(datos)
    pagina = montar(<Header />)
  }

  afterEach(() => pagina.desmontar())

  it('debe mostrar el enlace de acceso cuando no hay sesión', () => {
    abrir({})
    expect(pagina.contenedor.querySelector('a[href="/login"]')).not.toBeNull()
    expect(pagina.contenedor.querySelector('.btn-logout')).toBeNull()
  })

  it('debe mostrar el nombre y la inicial del usuario con sesión iniciada', () => {
    abrir({ usuarioActivo: JSON.stringify({ nombre: 'Ana', email: 'ana@correo.cl' }) })
    expect(pagina.contenedor.querySelector('.profile-pill').textContent).toContain('Ana')
    expect(pagina.contenedor.querySelector('.avatar-circle').textContent).toBe('A')
    expect(pagina.contenedor.querySelector('a[href="/login"]')).toBeNull()
  })

  it('debe mostrar la cantidad total de productos del carrito', () => {
    abrir({ tecnoShopCart: JSON.stringify(carrito) })
    expect(pagina.contenedor.querySelector('.cart-count').textContent).toBe('3')
  })

  it('debe actualizar el contador cuando se agrega un producto', () => {
    abrir({ tecnoShopCart: JSON.stringify(carrito) })
    memoria.tecnoShopCart = JSON.stringify([...carrito, { id: 3, nombre: 'Monitor', precio: 1, img: '/m.png', cantidad: 4 }])
    act(() => { window.dispatchEvent(new Event('cartUpdated')) })
    expect(pagina.contenedor.querySelector('.cart-count').textContent).toBe('7')
  })

  it('debe cerrar la sesión y volver al inicio al presionar el botón de salir', () => {
    abrir({ usuarioActivo: JSON.stringify({ nombre: 'Ana', email: 'ana@correo.cl' }) })
    clic(pagina.contenedor.querySelector('.btn-logout'))
    expect(memoria.usuarioActivo).toBeUndefined()
    expect(pagina.contenedor.querySelector('a[href="/login"]')).not.toBeNull()
    expect(pagina.rutaActual()).toBe('/')
  })

  it('debe llevar al catálogo con el texto buscado', () => {
    abrir({})
    escribir(pagina.contenedor.querySelector('.search-bar input'), 'monitor')
    enviarFormulario(pagina.contenedor.querySelector('.search-bar'))
    expect(pagina.rutaActual()).toBe('/productos?q=monitor')
  })
})
