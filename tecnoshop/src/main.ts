import 'leaflet/dist/leaflet.css';
import './style.css';

import { route, notFound, startRouter } from './router';
import { renderHeader, bindHeaderEvents } from './components/header';
import { renderFooter } from './components/footer';

import { HomeView, bindHomeEvents } from './views/home';
import { CatalogView, bindCatalogEvents } from './views/catalog';
import { ProductView, bindProductEvents } from './views/product';
import { CartView, bindCartEvents } from './views/cart';
import { CheckoutView, bindCheckoutEvents } from './views/checkout';
import { OrdersListView, OrderDetailView } from './views/orders';
import { LoginView, bindLoginEvents } from './views/login';
import { AdminView, bindAdminEvents } from './views/admin';
import { ContactView, bindContactEvents } from './views/contact';

const app = document.querySelector<HTMLDivElement>('#app')!;

function layout(content: string): string {
  return `${renderHeader()}<main id="main-content">${content}</main>${renderFooter()}`;
}

function render(content: string, after?: () => void) {
  app.innerHTML = layout(content);
  bindHeaderEvents();
  after?.();
}

route('/', () => render(HomeView(), bindHomeEvents));

route('/catalogo', (_p, query) => render(CatalogView(query), () => bindCatalogEvents(query)));

route('/producto/:id', (params) => render(ProductView(params), () => bindProductEvents(params)));

route('/carrito', () => render(CartView(), bindCartEvents));

route('/checkout', () => render(CheckoutView(), bindCheckoutEvents));

route('/pedidos', () => render(OrdersListView()));

route('/pedidos/:id', (params) => render(OrderDetailView(params)));

route('/login', (_p, query) => render(LoginView(query), () => bindLoginEvents(query)));

route('/admin', () => render(AdminView(), bindAdminEvents));

route('/contacto', () => render(ContactView(), bindContactEvents));

notFound(() =>
  render(`<div class="page"><p class="empty-state">Página no encontrada. <a href="#/">Volver al inicio</a></p></div>`)
);

document.addEventListener('cart-updated', () => {
  const headerEl = document.querySelector('.site-header');
  if (headerEl) headerEl.outerHTML = renderHeader();
  bindHeaderEvents();
});
document.addEventListener('session-changed', () => {
  const headerEl = document.querySelector('.site-header');
  if (headerEl) headerEl.outerHTML = renderHeader();
  bindHeaderEvents();
});
document.addEventListener('admin-catalog-changed', () => {
  window.dispatchEvent(new HashChangeEvent('hashchange'));
});

startRouter();
