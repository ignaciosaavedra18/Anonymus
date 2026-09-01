import { getOrdersByUser, getOrders, getSession } from '../state/store';
import { clp, formatDate, STATUS_LABELS, STATUS_ORDER, statusStep } from '../utils/format';
import type { Order } from '../types';

function statusTracker(order: Order): string {
  if (order.status === 'cancelado') {
    return `<p class="status-cancelled">Este pedido fue cancelado.</p>`;
  }
  const step = statusStep(order.status);
  return `
  <ol class="tracker">
    ${STATUS_ORDER.map((s, i) => {
      const state = i < step ? 'done' : i === step ? 'current' : 'pending';
      return `<li class="tracker-step ${state}">
        <span class="tracker-dot"></span>
        <span class="tracker-label">${STATUS_LABELS[s]}</span>
      </li>`;
    }).join('')}
  </ol>`;
}

function orderCard(order: Order): string {
  return `
  <article class="order-card">
    <div class="order-card-head">
      <div>
        <a href="#/pedidos/${order.id}" class="order-id">Pedido ${order.id}</a>
        <span class="order-date">${formatDate(order.date)}</span>
      </div>
      <span class="tag tag-status status-${order.status}">${STATUS_LABELS[order.status]}</span>
    </div>
    <ul class="order-items-mini">
      ${order.items.map((it) => `<li>${it.name} × ${it.qty}</li>`).join('')}
    </ul>
    <div class="order-card-foot">
      <span>${order.items.length} producto${order.items.length > 1 ? 's' : ''}</span>
      <strong>${clp(order.total)}</strong>
    </div>
  </article>`;
}

export function OrdersListView(): string {
  const session = getSession();
  if (!session) {
    return `<div class="page"><p class="empty-state">Debes <a href="#/login?next=pedidos">iniciar sesión</a> para ver tus pedidos.</p></div>`;
  }

  const orders = getOrdersByUser(session.id);

  return `
  <div class="page orders-page">
    <h1>Mis pedidos</h1>
    ${
      orders.length
        ? `<div class="order-list">${orders.map(orderCard).join('')}</div>`
        : `<p class="empty-state">Aún no tienes pedidos. <a href="#/catalogo">Explora el catálogo</a>.</p>`
    }
  </div>`;
}

export function OrderDetailView(params: Record<string, string>): string {
  const session = getSession();
  if (!session) {
    return `<div class="page"><p class="empty-state">Debes <a href="#/login">iniciar sesión</a> para ver este pedido.</p></div>`;
  }

  const order = getOrders().find((o) => o.id === params.id && o.userId === session.id);
  if (!order) {
    return `<div class="page"><p class="empty-state">Pedido no encontrado. <a href="#/pedidos">Volver a mis pedidos</a>.</p></div>`;
  }

  return `
  <div class="page order-detail-page">
    <nav class="breadcrumb"><a href="#/pedidos">Mis pedidos</a><span>/</span><span>${order.id}</span></nav>
    <h1>Pedido ${order.id}</h1>
    <p class="hint">Realizado el ${formatDate(order.date)}</p>

    ${statusTracker(order)}

    <section class="checkout-block">
      <h2>Productos</h2>
      <ul class="checkout-items">
        ${order.items
          .map(
            (it) => `<li><span>${it.name} × ${it.qty}</span><span>${clp(it.unitPrice * it.qty)}</span></li>`
          )
          .join('')}
      </ul>
      <div class="summary-row total"><span>Total</span><span>${clp(order.total)}</span></div>
    </section>
  </div>`;
}
