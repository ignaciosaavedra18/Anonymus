import { cartLinesWithProducts, cartTotal, updateCartQty, removeFromCart, getSession } from '../state/store';
import { clp } from '../utils/format';
import { navigate } from '../router';

export function CartView(): string {
  const lines = cartLinesWithProducts();

  if (lines.length === 0) {
    return `
    <div class="page cart-page">
      <h1>Carrito de compras</h1>
      <p class="empty-state">Tu carrito está vacío. <a href="#/catalogo">Explora el catálogo</a> para agregar productos.</p>
    </div>`;
  }

  return `
  <div class="page cart-page">
    <h1>Carrito de compras</h1>
    <div class="cart-layout">
      <ul class="cart-list">
        ${lines
          .map(
            ({ line, product }) => `
          <li class="cart-line" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" width="80" height="80" />
            <div class="cart-line-info">
              <a href="#/producto/${product.id}">${product.name}</a>
              <span class="cart-line-price">${clp(product.price)} c/u</span>
            </div>
            <div class="cart-line-qty">
              <button class="qty-btn" data-action="dec" aria-label="Disminuir cantidad">−</button>
              <input type="number" min="1" max="${product.stock}" value="${line.qty}" class="qty-input" aria-label="Cantidad" />
              <button class="qty-btn" data-action="inc" aria-label="Aumentar cantidad">+</button>
            </div>
            <span class="cart-line-subtotal">${clp(product.price * line.qty)}</span>
            <button class="btn-icon remove-line" aria-label="Eliminar producto">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </li>`
          )
          .join('')}
      </ul>

      <aside class="cart-summary">
        <h2>Resumen</h2>
        <div class="summary-row"><span>Subtotal</span><span id="cart-subtotal">${clp(cartTotal())}</span></div>
        <div class="summary-row"><span>Despacho</span><span>Se calcula en el checkout</span></div>
        <div class="summary-row total"><span>Total</span><span id="cart-total">${clp(cartTotal())}</span></div>
        <button class="btn btn-primary btn-block" id="go-checkout">Ir a pagar</button>
      </aside>
    </div>
  </div>`;
}

export function bindCartEvents() {
  function rerenderTotals() {
    const total = cartTotal();
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    if (subtotalEl) subtotalEl.textContent = clp(total);
    if (totalEl) totalEl.textContent = clp(total);
  }

  document.querySelectorAll<HTMLLIElement>('.cart-line').forEach((li) => {
    const id = li.dataset.id as string;
    const qtyInput = li.querySelector('.qty-input') as HTMLInputElement;
    const subtotalEl = li.querySelector('.cart-line-subtotal') as HTMLElement;
    const unitPrice = cartLinesWithProducts().find((l) => l.product.id === id)?.product.price ?? 0;

    function setQty(qty: number) {
      updateCartQty(id, qty);
      qtyInput.value = String(qty);
      subtotalEl.textContent = clp(qty * unitPrice);
      rerenderTotals();
      document.dispatchEvent(new CustomEvent('cart-updated'));
      if (qty <= 0) li.remove();
    }

    li.querySelector('[data-action="inc"]')?.addEventListener('click', () => setQty(Number(qtyInput.value) + 1));
    li.querySelector('[data-action="dec"]')?.addEventListener('click', () => setQty(Number(qtyInput.value) - 1));
    qtyInput.addEventListener('change', () => setQty(Math.max(0, Number(qtyInput.value))));

    li.querySelector('.remove-line')?.addEventListener('click', () => {
      removeFromCart(id);
      li.remove();
      rerenderTotals();
      document.dispatchEvent(new CustomEvent('cart-updated'));
    });
  });

  document.getElementById('go-checkout')?.addEventListener('click', () => {
    const session = getSession();
    navigate(session ? '/checkout' : '/login?next=checkout');
  });
}
