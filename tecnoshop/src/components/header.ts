import { getSession, cartCount, logout } from '../state/store';
import { navigate } from '../router';

export function renderHeader(): string {
  const session = getSession();
  const count = cartCount();

  return `
  <header class="site-header">
    <div class="header-inner">
      <a href="#/" class="brand">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path d="M3 7l9-4 9 4-9 4-9-4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
            <path d="M3 7v10l9 4 9-4V7" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
            <path d="M12 11v10" stroke="currentColor" stroke-width="1.6"/>
          </svg>
        </span>
        <span class="brand-name">Tecnoshop</span>
      </a>

      <form class="header-search" id="header-search-form" role="search">
        <input type="search" name="q" id="header-search-input" placeholder="Buscar productos, marcas..." aria-label="Buscar productos" />
        <button type="submit" aria-label="Buscar">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
      </form>

      <nav class="header-nav">
        <a href="#/pedidos" class="nav-link">Mis pedidos</a>
        <a href="#/contacto" class="nav-link">Soporte</a>
        ${session?.role === 'administrador' ? '<a href="#/admin" class="nav-link">Panel admin</a>' : ''}
        <a href="#/carrito" class="nav-link cart-link">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M3 4h2l2.2 11.4A2 2 0 0 0 9.16 17H18a2 2 0 0 0 1.96-1.6L21.5 8H6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="20.5" r="1.4" fill="currentColor"/><circle cx="17.5" cy="20.5" r="1.4" fill="currentColor"/></svg>
          <span>Carrito</span>
          ${count > 0 ? `<span class="cart-badge">${count}</span>` : ''}
        </a>
        ${
          session
            ? `<div class="user-menu">
                <span class="user-name">${session.name.split(' ')[0]}</span>
                <button class="btn-link" id="logout-btn">Salir</button>
              </div>`
            : `<a href="#/login" class="btn btn-primary btn-sm">Iniciar sesión</a>`
        }
      </nav>
    </div>
  </header>`;
}

export function bindHeaderEvents() {
  const form = document.getElementById('header-search-form') as HTMLFormElement | null;
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('header-search-input') as HTMLInputElement;
    const q = input.value.trim();
    navigate(`/catalogo${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  });

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    logout();
    navigate('/');
  });
}
