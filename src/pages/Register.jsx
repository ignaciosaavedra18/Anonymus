import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!form.nombre || !form.email || !form.password) {
      setError('Todos los campos son obligatorios.')
      return
    }
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]')
    users.push({ ...form })
    localStorage.setItem('usuarios', JSON.stringify(users))
    localStorage.setItem('usuarioActivo', JSON.stringify(form))
    window.dispatchEvent(new Event('authUpdated'))
    navigate('/perfil')
  }

  return (
    <section className="d-flex justify-content-center">
      <form className="login-caja" onSubmit={submit}>
        <h2>Crear cuenta</h2>
        <p>Regístrate en TecnoShop</p>
        {error && <div className="alerta-error">{error}</div>}
        <div className="grupo-input"><label>Nombre</label><input value={form.nombre} onChange={(event) => setForm({ ...form, nombre: event.target.value })} /></div>
        <div className="grupo-input"><label>Correo</label><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></div>
        <div className="grupo-input"><label>Contraseña</label><input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></div>
        <button className="btn-primario" type="submit">Registrarme</button>
        <Link className="btn-secundario mt-2" to="/login">Ya tengo una cuenta</Link>
      </form>
    </section>
  )
}

export default Register
