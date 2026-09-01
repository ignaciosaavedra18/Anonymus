import type { Product } from '../types';
import { clp } from '../utils/format';

export function renderProductCard(p: Product): string {
  const outOfStock = p.stock <= 0;
  return `
  <article class="product-card" data-id="${p.id}">
    <a href="#/producto/${p.id}" class="product-card-media">
      <img src="${p.image}" alt="${p.name}" loading="lazy" width="400" height="400" />
      ${outOfStock ? '<span class="tag tag-out">Sin stock</span>' : ''}
    </a>
    <div class="product-card-body">
      <a href="#/producto/${p.id}" class="product-name">${p.name}</a>
      <dl class="spec-row">
        <div><dt>Categoría</dt><dd>${p.category}</dd></div>
        <div><dt>Marca</dt><dd>${p.brand}</dd></div>
        <div><dt>Rating</dt><dd>${p.rating.toFixed(1)} / 5</dd></div>
      </dl>
      <div class="product-card-footer">
        <span class="price">${clp(p.price)}</span>
        <button class="btn btn-primary btn-sm add-to-cart" data-id="${p.id}" ${outOfStock ? 'disabled' : ''}>
          Agregar
        </button>
      </div>
    </div>
  </article>`;
}
