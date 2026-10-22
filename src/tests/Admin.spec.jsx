import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import Admin from '../pages/Admin'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

describe('Admin (CRUD de productos)', () => {
  let memoria
  let contenedor
  let raiz

  function escribir(campo, valor) {
    const asignar = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
    act(() => {
      asignar.call(campo, valor)
      campo.dispatchEvent(new Event('input', { bubbles: true }))
    })
  }

  function campoDe(etiqueta) {
    const grupos = Array.from(contenedor.querySelectorAll('.grupo-input'))
    return grupos.find((grupo) => grupo.textContent.includes(etiqueta)).querySelector('input')
  }

  function botonConTexto(texto) {
    return Array.from(contenedor.querySelectorAll('button')).find((boton) => boton.textContent.includes(texto))
  }

  function crearProducto(nombre, precio) {
    escribir(campoDe('Nombre'), nombre)
    escribir(campoDe('Precio'), precio)
    act(() => { botonConTexto('Crear producto').click() })
  }

  beforeEach(() => {
    memoria = {}
    spyOn(localStorage, 'getItem').and.callFake((clave) => (clave in memoria ? memoria[clave] : null))
    spyOn(localStorage, 'setItem').and.callFake((clave, valor) => { memoria[clave] = String(valor) })
    spyOn(localStorage, 'removeItem').and.callFake((clave) => { delete memoria[clave] })
    contenedor = document.createElement('div')
    document.body.appendChild(contenedor)
    raiz = createRoot(contenedor)
    act(() => { raiz.render(<Admin />) })
  })

  afterEach(() => {
    act(() => raiz.unmount())
    contenedor.remove()
  })

  it('debe mostrar el formulario de nuevo producto y la lista vacía al comienzo', () => {
    expect(contenedor.textContent).toContain('Nuevo producto')
    expect(contenedor.textContent).toContain('Todavía no hay productos creados')
  })

  it('debe mostrar un error y no guardar si el nombre está vacío', () => {
    act(() => { botonConTexto('Crear producto').click() })
    expect(contenedor.querySelector('.alert-info').textContent).toContain('Completa el nombre')
    expect(memoria['Catalago']).toBeUndefined()
  })

  it('debe crear un producto y mostrarlo en la tabla', () => {
    crearProducto('Mouse de prueba', '15990')
    expect(contenedor.querySelector('.alert-info').textContent).toContain('guardado correctamente')
    expect(contenedor.querySelector('tbody').textContent).toContain('Mouse de prueba')
  })

  it('debe cargar el producto en el formulario al presionar Editar', () => {
    crearProducto('Mouse de prueba', '15990')
    act(() => { botonConTexto('Editar').click() })
    expect(contenedor.textContent).toContain('Guardar cambios')
    expect(campoDe('Nombre').value).toBe('Mouse de prueba')
  })

  it('debe eliminar el producto cuando el administrador confirma', () => {
    spyOn(window, 'confirm').and.returnValue(true)
    crearProducto('Mouse de prueba', '15990')
    act(() => { botonConTexto('Eliminar').click() })
    expect(window.confirm).toHaveBeenCalled()
    expect(contenedor.textContent).not.toContain('Mouse de prueba')
  })

  it('no debe eliminar el producto si el administrador cancela', () => {
    spyOn(window, 'confirm').and.returnValue(false)
    crearProducto('Mouse de prueba', '15990')
    act(() => { botonConTexto('Eliminar').click() })
    expect(contenedor.querySelector('tbody').textContent).toContain('Mouse de prueba')
  })
})