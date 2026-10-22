import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

function RutaActual() {
  const ubicacion = useLocation()
  return <div id="ruta-actual">{ubicacion.pathname + ubicacion.search}</div>
}

export function simularLocalStorage(datosIniciales = {}) {
  const memoria = { ...datosIniciales }
  spyOn(localStorage, 'getItem').and.callFake((clave) => (clave in memoria ? memoria[clave] : null))
  spyOn(localStorage, 'setItem').and.callFake((clave, valor) => { memoria[clave] = String(valor) })
  spyOn(localStorage, 'removeItem').and.callFake((clave) => { delete memoria[clave] })
  return memoria
}

export function montar(elemento, opciones = {}) {
  const { ruta = '/', patron = null } = opciones
  const contenedor = document.createElement('div')
  document.body.appendChild(contenedor)
  const raiz = createRoot(contenedor)
  const contenido = patron ? <Routes><Route path={patron} element={elemento} /></Routes> : elemento
  act(() => {
    raiz.render(<MemoryRouter initialEntries={[ruta]}>{contenido}<RutaActual /></MemoryRouter>)
  })
  return {
    contenedor,
    rutaActual: () => contenedor.querySelector('#ruta-actual').textContent,
    desmontar: () => {
      act(() => raiz.unmount())
      contenedor.remove()
    }
  }
}

export function escribir(campo, valor) {
  let prototipo = HTMLInputElement.prototype
  let evento = 'input'
  if (campo.tagName === 'SELECT') {
    prototipo = HTMLSelectElement.prototype
    evento = 'change'
  } else if (campo.tagName === 'TEXTAREA') {
    prototipo = HTMLTextAreaElement.prototype
  }
  const asignar = Object.getOwnPropertyDescriptor(prototipo, 'value').set
  act(() => {
    asignar.call(campo, valor)
    campo.dispatchEvent(new Event(evento, { bubbles: true }))
  })
}

export function clic(elemento) {
  act(() => { elemento.click() })
}

export function enviarFormulario(formulario) {
  act(() => {
    formulario.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  })
}

export function botonConTexto(contenedor, texto) {
  return Array.from(contenedor.querySelectorAll('button')).find((boton) => boton.textContent.includes(texto))
}

export function campoDeEtiqueta(contenedor, etiqueta) {
  const nombre = Array.from(contenedor.querySelectorAll('label')).find((item) => item.textContent.trim() === etiqueta)
  return nombre.parentElement.querySelector('input, select, textarea')
}
