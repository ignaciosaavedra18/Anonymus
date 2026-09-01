import { getSession, getProducts, getOrders, upsertProduct, nextProductId, updateOrderStatus, getUsers } from '../state/store';
import { clp, formatDate, STATUS_LABELS, STATUS_ORDER } from '../utils/format';

export function AdminView(): string {
  const session = getSession();
  if (!session || session.role !== 'administrador') {
    return `<div class="page"><p class="empty-state">Esta sección es solo para administradores. <a href="#/login">Iniciar sesión</a></p></div>`;
  }

  const products = getProducts();
  const orders = [...getOrders()].sort((a, b) => (a.date < b.date ? 1 : -1));
  const users = getUsers();

  return `
  <div class="page admin-page">
    <h1>Panel de administración</h1>
    <p class="hint">${users.length} usuarios registrados · ${products.length} productos · ${orders.length} pedidos</p>

    <section class="admin-block">
      <h2>Nuevo producto</h2>
      <form id="new-product-form" class="admin-form">
        <input type="text" id="np-name" placeholder="Nombre del producto" required />
        <input type="text" id="np-category" placeholder="Categoría" required />
        <input type="text" id="np-brand" placeholder="Marca" required />
        <input type="number" id="np-price" placeholder="Precio (CLP)" min="0" step="1000" required />
        <input type="number" id="np-stock" placeholder="Stock" min="0" required />
        <button class="btn btn-primary btn-sm" type="submit">Agregar producto</button>
      </form>
      <p class="feedback" id="admin-product-feedback" role="status"></p>
    </section>

    <section class="admin-block">
      <h2>Catálogo y stock</h2>
      <div class="table-wrap">
        <table class="admin-table" id="admin-products-table">
          <thead>
            <tr><th>Producto</th><th>Categoría</th><th>Marca</th><th>Precio</th><th>Stock</th><th></th></tr>
          </thead>
          <tbody>
            ${products
              .map(
                (p) => `
              <tr data-id="${p.id}">
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.brand}</td>
                <td><input type="number" class="edit-price" value="${p.price}" min="0" step="1000" /></td>
                <td><input type="number" class="edit-stock" value="${p.stock}" min="0" /></td>
                <td><button class="btn btn-ghost btn-sm save-product">Guardar</button></td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>

    <section class="admin-block">
      <h2>Pedidos</h2>
      <div class="table-wrap">
        <table class="admin-table">
          <thead>
            <tr><th>Pedido</th><th>Fecha</th><th>Total</th><th>Estado</th></tr>
          </thead>
          <tbody>
            ${orders
              .map(
                (o) => `
              <tr data-id="${o.id}">
                <td>${o.id}</td>
                <td>${formatDate(o.date)}</td>
                <td>${clp(o.total)}</td>
                <td>
                  <select class="order-status-select">
                    ${STATUS_ORDER.concat('cancelado')
                      .map((s) => `<option value="${s}" ${s === o.status ? 'selected' : ''}>${STATUS_LABELS[s]}</option>`)
                      .join('')}
                  </select>
                </td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>
  </div>`;
}

export function bindAdminEvents() {
  const session = getSession();
  if (!session || session.role !== 'administrador') return;

  document.getElementById('new-product-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('np-name') as HTMLInputElement).value.trim();
    const category = (document.getElementById('np-category') as HTMLInputElement).value.trim();
    const brand = (document.getElementById('np-brand') as HTMLInputElement).value.trim();
    const price = Number((document.getElementById('np-price') as HTMLInputElement).value);
    const stock = Number((document.getElementById('np-stock') as HTMLInputElement).value);

    upsertProduct({
      id: nextProductId(),
      name,
      category,
      brand,
      price,
      stock,
      rating: 4.5,
      image:
        'data:image/svg+xml;base64,' +
        btoa(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#EEF0F6"/><circle cx="100" cy="90" r="35" fill="none" stroke="#3730A9" stroke-width="4"/><text x="100" y="188" font-family="Arial" font-size="11" text-anchor="middle" fill="#3730A9" font-weight="600">${brand}</text></svg>`
        ),
      description: `${name} de la marca ${brand}. Categoría: ${category}.`,
    });

    const feedback = document.getElementById('admin-product-feedback') as HTMLElement;
    feedback.textContent = `Producto "${name}" agregado al catálogo.`;
    document.dispatchEvent(new CustomEvent('admin-catalog-changed'));
  });

  document.querySelectorAll<HTMLButtonElement>('.save-product').forEach((btn) => {
    btn.addEventListener('click', () => {
      const row = btn.closest('tr') as HTMLTableRowElement;
      const id = row.dataset.id as string;
      const product = getProducts().find((p) => p.id === id);
      if (!product) return;
      const price = Number((row.querySelector('.edit-price') as HTMLInputElement).value);
      const stock = Number((row.querySelector('.edit-stock') as HTMLInputElement).value);
      upsertProduct({ ...product, price, stock });
      btn.textContent = 'Guardado ✓';
      setTimeout(() => (btn.textContent = 'Guardar'), 900);
    });
  });

  document.querySelectorAll<HTMLSelectElement>('.order-status-select').forEach((select) => {
    select.addEventListener('change', () => {
      const row = select.closest('tr') as HTMLTableRowElement;
      const id = row.dataset.id as string;
      updateOrderStatus(id, select.value as any);
    });
  });
}
