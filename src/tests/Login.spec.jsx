import React from 'react'
import { botonConTexto, campoDeEtiqueta, clic, enviarFormulario, escribir, montar, simularLocalStorage } from './ayudas'
import Login from '../pages/Login'

describe('Login', () => {
  let pagina
  let memoria

  beforeEach(() => {
    memoria = simularLocalStorage({
      usuarios: JSON.stringify([{ nombre: 'Ana', email: 'ana@correo.cl', password: '12345678' }])
    })
    pagina = montar(<Login />, { ruta: '/login' })
  })

  afterEach(() => pagina.desmontar())

  it('debe mostrar los campos de correo y contraseña', () => {
    expect(campoDeEtiqueta(pagina.contenedor, 'Correo')).not.toBeNull()
    expect(campoDeEtiqueta(pagina.contenedor, 'Contraseña')).not.toBeNull()
    expect(botonConTexto(pagina.contenedor, 'Ingresar')).toBeDefined()
  })

  it('debe mostrar un error si el correo está vacío', () => {
    enviarFormulario(pagina.contenedor.querySelector('form'))
    expect(pagina.contenedor.querySelector('.alerta-error').textContent).toContain('Ingresa un correo')
    expect(memoria.usuarioActivo).toBeUndefined()
  })

  it('debe iniciar sesión con un usuario registrado y avisar al resto de la aplicación', () => {
    const avisoDeSesion = jasmine.createSpy('authUpdated')
    window.addEventListener('authUpdated', avisoDeSesion)
    escribir(campoDeEtiqueta(pagina.contenedor, 'Correo'), 'ana@correo.cl')
    clic(botonConTexto(pagina.contenedor, 'Ingresar'))
    window.removeEventListener('authUpdated', avisoDeSesion)

    expect(JSON.parse(memoria.usuarioActivo).nombre).toBe('Ana')
    expect(avisoDeSesion).toHaveBeenCalled()
    expect(pagina.rutaActual()).toBe('/perfil')
  })
})
