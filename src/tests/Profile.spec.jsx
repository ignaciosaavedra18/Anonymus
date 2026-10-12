import React from 'react'
import { campoDeEtiqueta, botonConTexto, clic, escribir, montar, simularLocalStorage } from './ayudas'
import Products from '../pages/Products'
import { productosIniciales } from '../data/productos'

describe('Products (catálogo con filtros)', () => {
  let pagina

  function tarjetas() {
    return pagina.contenedor.querySelectorAll('.product-card').length
  }

  beforeEach(() => {
    simularLocalStorage()
  })

  afterEach(() => pagina.desmontar())

  it('debe mostrar todos los productos al comienzo', () => {
    pagina = montar(<Products />)
    expect(tarjetas()).toBe(productosIniciales.length)
  })

  it('debe filtrar por el texto buscado', () => {
    pagina = montar(<Products />)
    escribir(campoDeEtiqueta(pagina.contenedor, 'Buscar'), 'monitor')
    const esperados = productosIniciales.filter((producto) => (
      producto.nombre.toLowerCase().includes('monitor') || producto.categoria.includes('monitor')
    )).length
    expect(tarjetas()).toBe(esperados)
    expect(esperados).toBeGreaterThan(0)
  })

  it('debe filtrar por categoría', () => {
    pagina = montar(<Products />)
    escribir(campoDeEtiqueta(pagina.contenedor, 'Categoría'), 'monitores')
    expect(tarjetas()).toBe(productosIniciales.filter((producto) => producto.categoria === 'monitores').length)
  })

  it('debe filtrar por precio máximo', () => {
    pagina = montar(<Products />)
    escribir(campoDeEtiqueta(pagina.contenedor, 'Precio máximo'), '50000')
    const esperados = productosIniciales.filter((producto) => producto.precio <= 50000).length
    expect(tarjetas()).toBe(esperados)
    expect(esperados).toBeLessThan(productosIniciales.length)
  })

  it('debe mostrar un mensaje cuando ningún producto coincide', () => {
    pagina = montar(<Products />)
    escribir(campoDeEtiqueta(pagina.contenedor, 'Buscar'), 'zzzzzz')
    expect(tarjetas()).toBe(0)
    expect(pagina.contenedor.textContent).toContain('No se encontraron productos')
  })

  it('debe restablecer los filtros con el botón Limpiar', () => {
    pagina = montar(<Products />)
    escribir(campoDeEtiqueta(pagina.contenedor, 'Buscar'), 'zzzzzz')
    clic(botonConTexto(pagina.contenedor, 'Limpiar'))
    expect(tarjetas()).toBe(productosIniciales.length)
  })

  it('debe aplicar el texto que llega en la dirección (?q=)', () => {
    pagina = montar(<Products />, { ruta: '/productos?q=monitor' })
    expect(tarjetas()).toBeLessThan(productosIniciales.length)
    expect(campoDeEtiqueta(pagina.contenedor, 'Buscar').value).toBe('monitor')
  })
})
