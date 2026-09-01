import { getProducts, getCategories, addToCart } from '../state/store';
import { renderProductCard } from '../components/productCard';

const CATEGORY_ICONS: Record<string, string> = {
  Computadores: 'M4 5h16v10H4z M9 19h6 M12 15v4',
  Celulares: 'M8 3h8v18H8z M11 18h2',
  Tablets: 'M5 4h14v16H5z M12 17h.01',
  Smartwatches: 'M9 6h6v3H9z M9 15h6v3H9z M8 9h8v6H8z',
  Monitores: 'M4 4h16v11H4z M9 19h6 M12 15v4',
  'Audífonos': 'M4 13a8 8 0 0 1 16 0 M4 13v4a2 2 0 0 0 2 2h1v-6H5 M17 13v6h1a2 2 0 0 0 2-2v-4h-2',
  Accesorios: 'M12 3v4 M12 17v4 M3 12h4 M17 12h4 M7 7l2 2 M15 15l2 2 M17 7l-2 2 M9 15l-2 2',
};

export function HomeView(): string {
  const products = getProducts();
  const categories = getCategories();
  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return `
  <div class="page home-page">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow-cat">Tienda de tecnología</p>
        <h1>Compara y compra tecnología sin salir de una sola pantalla.</h1>
        <p>Computadores, celulares, tablets, smartwatches, monitores, audífonos y accesorios — con filtros por categoría, marca y precio, y seguimiento de tu pedido de principio a fin.</p>
        <div class="hero-actions">
          <a href="#/catalogo" class="btn btn-primary">Ver catálogo</a>
          <a href="#/contacto" class="btn btn-ghost">Hablar con soporte</a>
        </div>
      </div>
      <div class="hero-figure" aria-hidden="true">
        <svg viewBox="0 0 320 320" width="100%" height="100%">
          <rect x="40" y="40" width="240" height="150" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
          <rect x="100" y="200" width="120" height="10" rx="2" fill="currentColor" opacity="0.15"/>
          <circle cx="160" cy="115" r="46" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M160 69v92M114 115h92" stroke="currentColor" stroke-width="1.4" opacity="0.5"/>
          <circle cx="160" cy="115" r="6" fill="currentColor"/>
        </svg>
      </div>
    </section>

    <section class="categories-strip">
      ${categories
        .map(
          (c) => `
        <a href="#/catalogo?cat=${encodeURIComponent(c)}" class="category-chip">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="${CATEGORY_ICONS[c] || 'M4 4h16v16H4z'}" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>${c}</span>
        </a>`
        )
        .join('')}
    </section>

    <section class="featured">
      <div class="section-head">
        <h2>Mejor calificados</h2>
        <a href="#/catalogo">Ver todo el catálogo</a>
      </div>
      <div class="product-grid">${featured.map(renderProductCard).join('')}</div>
    </section>
  </div>`;
}

export function bindHomeEvents() {
  document.querySelectorAll<HTMLButtonElement>('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.id as string, 1);
      btn.textContent = 'Agregado ✓';
      setTimeout(() => (btn.textContent = 'Agregar'), 900);
      document.dispatchEvent(new CustomEvent('cart-updated'));
    });
  });
}
