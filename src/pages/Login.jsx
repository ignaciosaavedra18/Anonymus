import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!email.trim()) {
      setError('Ingresa un correo para continuar.')
      return
    }
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const found = users.find((user) => user.email === email.trim())
    const user = found || { nombre: email.split('@')[0], email }
    localStorage.setItem('usuarioActivo', JSON.stringify(user))
    window.dispatchEvent(new Event('authUpdated'))
    navigate('/perfil')
  }

  return (
    <section className="d-flex justify-content-center">
      <form className="login-caja" onSubmit={submit}>
        <h2>Iniciar sesión</h2>
        <p>Accede a tu cuenta TecnoShop</p>
        {error && <div className="alerta-error">{error}</div>}
        <div className="grupo-input"><label>Correo</label><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
        <div className="grupo-input"><label>Contraseña</label><input type="password" defaultValue="123456" required /></div>
        <button className="btn-primario" type="submit">Ingresar</button>
        <Link className="btn-secundario mt-2" to="/registro">Crear cuenta</Link>
      </form>
    </section>
  )
}

export default Login
