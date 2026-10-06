import { useState } from 'react'

function Profile() {
  const saved = JSON.parse(localStorage.getItem('usuarioActivo') || 'null')
  const [user, setUser] = useState(saved || { nombre: '', email: '' })
  const [savedMessage, setSavedMessage] = useState('')

  const save = (event) => {
    event.preventDefault()
    localStorage.setItem('usuarioActivo', JSON.stringify(user))
    setSavedMessage('Datos actualizados correctamente.')
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <section>
      <div className="section-title-bar" style={{ borderColor: 'var(--border-color)' }}><h2 style={{ color: 'var(--purple-700)' }}>Mi perfil</h2></div>
      <form className="card p-4 shadow-sm" onSubmit={save}>
        {savedMessage && <div className="alert alert-success">{savedMessage}</div>}
        <div className="row g-3">
          <div className="col-12 col-md-6"><label className="form-label">Nombre</label><input className="form-control" value={user.nombre} onChange={(event) => setUser({ ...user, nombre: event.target.value })} /></div>
          <div className="col-12 col-md-6"><label className="form-label">Correo</label><input className="form-control" type="email" value={user.email} onChange={(event) => setUser({ ...user, email: event.target.value })} /></div>
        </div>
        <button className="btn btn-primary mt-4" type="submit">Guardar cambios</button>
      </form>
    </section>
  )
}

export default Profile
