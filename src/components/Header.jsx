import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { cartCount, getCart } from '../services/cartService'

function Header() {
  const navigate = useNavigate()
  const [count, setCount] = useState(cartCount())
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('usuarioActivo') || 'null'))
  const [search, setSearch] = useState('')

  useEffect(() => {
    const update = () => {
      setCount(cartCount(getCart()))
      setUser(JSON.parse(localStorage.getItem('usuarioActivo') || 'null'))
    }
    window.addEventListener('storage', update)
    window.addEventListener('cartUpdated', update)
    window.addEventListener('authUpdated', update)
    return () => {
      window.removeEventListener('storage', update)
      window.removeEventListener('cartUpdated', update)
      window.removeEventListener('authUpdated', update)
    }
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    navigate(`/productos${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`)
  }

  const logout = () => {
    localStorage.removeItem('usuarioActivo')
    setUser(null)
    navigate('/')
  }

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/" className="brand-link">
          <img src="/images/LogoTienda.jpg" alt="Logo TecnoShop" className="header-logo-img" />
          <div className="brand-box">
            <span className="logo">TecnoShop</span>
          </div>
        </Link>

        <form className="search-bar" onSubmit={handleSearch}>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="¿Qué buscas? Ej: RTX 4060, Ryzen 7, Notebook Gamer..." />
          <button type="submit" aria-label="Buscar">🔍</button>
        </form>

        <nav>
          <ul className="nav-links">
            <li><NavLink to="/" end>Inicio</NavLink></li>
            <li><NavLink to="/productos">Catálogo</NavLink></li>
            <li><NavLink to="/categorias">Categorías</NavLink></li>
            <li><NavLink to="/ofertas">Ofertas</NavLink></li>
            <li><NavLink to="/blogs">Blogs</NavLink></li>
            <li><NavLink to="/admin">Admin</NavLink></li>
            {!user ? (
              <li><NavLink to="/login">Acceso</NavLink></li>
            ) : (
              <li style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Link to="/perfil" className="profile-pill">
                  <span className="avatar-circle">{(user.nombre || 'U').charAt(0).toUpperCase()}</span>
                  <span>{user.nombre || 'Mi Perfil'}</span>
                </Link>
                <button type="button" className="btn-logout" onClick={logout} title="Cerrar sesión">↪</button>
              </li>
            )}
            <li>
              <Link to="/carrito" className="cart-icon">🛒 <span className="cart-count">{count}</span></Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
