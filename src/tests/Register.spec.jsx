import React from 'react'
import { botonConTexto, campoDeEtiqueta, clic, enviarFormulario, escribir, montar, simularLocalStorage } from './ayudas'
import Register from '../pages/Register'

describe('Register', () => {
  let pagina
  let memoria

  beforeEach(() => {
    memoria = simularLocalStorage()
    pagina = montar(<Register />, { ruta: '/registro' })
  })

  afterEach(() => pagina.desmontar())

  it('debe mostrar un error si hay campos vacíos y no guardar nada', () => {
    enviarFormulario(pagina.contenedor.querySelector('form'))
    expect(pagina.contenedor.querySelector('.alerta-error').textContent).toContain('Todos los campos son obligatorios')
    expect(memoria.usuarios).toBeUndefined()
  })

  it('debe actualizar el estado del formulario mientras el usuario escribe', () => {
    escribir(campoDeEtiqueta(pagina.contenedor, 'Nombre'), 'Luis')
    expect(campoDeEtiqueta(pagina.contenedor, 'Nombre').value).toBe('Luis')
  })

  it('debe guardar el usuario, abrir su sesión y llevarlo al perfil', () => {
    escribir(campoDeEtiqueta(pagina.contenedor, 'Nombre'), 'Luis')
    escribir(campoDeEtiqueta(pagina.contenedor, 'Correo'), 'luis@correo.cl')
    escribir(campoDeEtiqueta(pagina.contenedor, 'Contraseña'), '12345678')
    clic(botonConTexto(pagina.contenedor, 'Registrarme'))

    const usuarios = JSON.parse(memoria.usuarios)
    expect(usuarios.length).toBe(1)
    expect(usuarios[0].email).toBe('luis@correo.cl')
    expect(JSON.parse(memoria.usuarioActivo).nombre).toBe('Luis')
    expect(pagina.rutaActual()).toBe('/perfil')
  })
})
