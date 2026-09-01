import { getProduct, addToCart, getProducts } from '../state/store';
import { clp } from '../utils/format';
import { renderProductCard } from '../components/productCard';

export function ProductView(params: Record<string, string>): string {
  const product = getProduct(params.id);
  if (!product) {
    return `<div class="page"><p class="empty-state">Producto no encontrado. <a href="#/catalogo">Volver al catálogo</a></p></div>`;
  }

  const related = getProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return `
  <div class="page product-page">
    <nav class="breadcrumb" aria-label="Ruta de navegación">
      <a href="#/catalogo">Catálogo</a>
      <span>/</span>
      <a href="#/catalogo?cat=${encodeURIComponent(product.category)}">${product.category}</a>
      <span>/</span>
      <span>${product.name}</span>
    </nav>

    <div class="product-detail">
      <div class="product-detail-media">
        <img src="${product.image}" alt="${product.name}" width="480" height="480" />
      </div>
      <div class="product-detail-info">
        <p class="eyebrow-cat">${product.category} · ${product.brand}</p>
        <h1>${product.name}</h1>
        <p class="rating">Calificación: ${product.rating.toFixed(1)} / 5</p>
        <p class="price-lg">${clp(product.price)}</p>
        <p class="stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}">
          ${product.stock > 0 ? `${product.stock} unidades disponibles` : 'Sin stock disponible'}
        </p>
        <p class="description">${product.description}</p>

        <div class="qty-add">
          <label for="qty">Cantidad</label>
          <input type="number" id="qty" min="1" max="${Math.max(product.stock, 1)}" value="1" ${product.stock === 0 ? 'disabled' : ''} />
          <button class="btn btn-primary" id="add-to-cart-detail" ${product.stock === 0 ? 'disabled' : ''}>
            Agregar al carrito
          </button>
        </div>
        <p class="feedback" id="add-feedback" role="status"></p>

        <dl class="spec-table">
          <div><dt>Categoría</dt><dd>${product.category}</dd></div>
          <div><dt>Marca</dt><dd>${product.brand}</dd></div>
          <div><dt>SKU</dt><dd>${product.id}</dd></div>
        </dl>
      </div>
    </div>

    ${
      related.length
        ? `<section class="related">
            <h2>También en ${product.category}</h2>
            <div class="product-grid">${related.map(renderProductCard).join('')}</div>
          </section>`
        : ''
    }
  </div>`;
}

export function bindProductEvents(params: Record<string, string>) {
  const product = getProduct(params.id);
  if (!product) return;

  const addBtn = document.getElementById('add-to-cart-detail') as HTMLButtonElement | null;
  const qtyInput = document.getElementById('qty') as HTMLInputElement | null;
  const feedback = document.getElementById('add-feedback') as HTMLElement | null;

  addBtn?.addEventListener('click', () => {
    const qty = Math.max(1, Number(qtyInput?.value || 1));
    addToCart(product.id, qty);
    if (feedback) feedback.textContent = `${qty} unidad${qty > 1 ? 'es' : ''} agregada${qty > 1 ? 's' : ''} al carrito.`;
    document.dispatchEvent(new CustomEvent('cart-updated'));
  });

  document.querySelectorAll<HTMLButtonElement>('.related .add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.id as string, 1);
      document.dispatchEvent(new CustomEvent('cart-updated'));
    });
  });
}
