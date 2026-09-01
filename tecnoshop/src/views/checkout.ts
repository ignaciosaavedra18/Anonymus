import { cartLinesWithProducts, cartTotal, getSession, placeOrder } from '../state/store';
import { clp } from '../utils/format';
import { navigate } from '../router';

export function CheckoutView(): string {
  const session = getSession();
  if (!session) {
    return `<div class="page"><p class="empty-state">Debes <a href="#/login?next=checkout">iniciar sesión</a> para continuar con tu compra.</p></div>`;
  }

  const lines = cartLinesWithProducts();
  if (lines.length === 0) {
    return `<div class="page"><p class="empty-state">Tu carrito está vacío. <a href="#/catalogo">Vuelve al catálogo</a>.</p></div>`;
  }

  return `
  <div class="page checkout-page">
    <h1>Resumen de compra</h1>
    <div class="checkout-layout">
      <div class="checkout-details">
        <section class="checkout-block">
          <h2>Datos de entrega</h2>
          <p><strong>${session.name}</strong></p>
          <p>${session.email}</p>
          <p>Región de ${session.region}</p>
          <p class="hint">Retiro disponible en Av. Providencia 1208, Providencia.</p>
        </section>

        <section class="checkout-block">
          <h2>Productos</h2>
          <ul class="checkout-items">
            ${lines
              .map(
                ({ line, product }) => `
              <li>
                <span>${product.name} × ${line.qty}</span>
                <span>${clp(product.price * line.qty)}</span>
              </li>`
              )
              .join('')}
          </ul>
        </section>

        <section class="checkout-block">
          <h2>Método de pago</h2>
          <div class="pay-options">
            <label><input type="radio" name="pay" value="webpay" checked /> Webpay (simulado)</label>
            <label><input type="radio" name="pay" value="transferencia" /> Transferencia (simulado)</label>
          </div>
          <p class="hint">Este es un flujo de demostración académica: no se procesan pagos reales.</p>
        </section>
      </div>

      <aside class="cart-summary">
        <h2>Total</h2>
        <div class="summary-row"><span>Subtotal</span><span>${clp(cartTotal())}</span></div>
        <div class="summary-row"><span>Despacho</span><span>Gratis</span></div>
        <div class="summary-row total"><span>Total a pagar</span><span>${clp(cartTotal())}</span></div>
        <button class="btn btn-primary btn-block" id="confirm-order">Confirmar pedido</button>
        <p class="feedback" id="checkout-feedback" role="status"></p>
      </aside>
    </div>
  </div>`;
}

export function bindCheckoutEvents() {
  const session = getSession();
  const btn = document.getElementById('confirm-order') as HTMLButtonElement | null;
  const feedback = document.getElementById('checkout-feedback') as HTMLElement | null;

  btn?.addEventListener('click', () => {
    if (!session) return;
    const result = placeOrder(session.id);
    if ('error' in result) {
      if (feedback) feedback.textContent = result.error;
      return;
    }
    document.dispatchEvent(new CustomEvent('cart-updated'));
    navigate(`/pedidos/${result.id}`);
  });
}
