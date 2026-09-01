import { getProducts, getCategories, getBrands, addToCart } from '../state/store';
import { renderProductCard } from '../components/productCard';
import type { Product } from '../types';

interface Filters {
  q: string;
  category: string;
  brand: string;
  minPrice: number | null;
  maxPrice: number | null;
  sort: 'relevancia' | 'precio_asc' | 'precio_desc' | 'rating';
}

function applyFilters(products: Product[], f: Filters): Product[] {
  let result = products.filter((p) => {
    if (f.q && !`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(f.q.toLowerCase())) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.brand && p.brand !== f.brand) return false;
    if (f.minPrice != null && p.price < f.minPrice) return false;
    if (f.maxPrice != null && p.price > f.maxPrice) return false;
    return true;
  });
  switch (f.sort) {
    case 'precio_asc':
      result = result.sort((a, b) => a.price - b.price);
      break;
    case 'precio_desc':
      result = result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result = result.sort((a, b) => b.rating - a.rating);
      break;
  }
  return result;
}

export function CatalogView(query: URLSearchParams): string {
  const categories = getCategories();
  const brands = getBrands();

  const catFilter = query.get('cat') || '';
  const brandFilter = query.get('brand') || '';

  return `
  <div class="page catalog-page">
    <div class="page-head">
      <h1>Catálogo de productos</h1>
      <p>Filtra por categoría, marca y precio para encontrar el producto tecnológico que necesitas.</p>
    </div>

    <div class="catalog-layout">
      <aside class="filters" aria-label="Filtros de búsqueda">
        <div class="filter-group">
          <label for="f-search">Buscar</label>
          <input type="search" id="f-search" placeholder="Nombre, marca..." />
        </div>

        <div class="filter-group">
          <label for="f-category">Categoría</label>
          <select id="f-category">
            <option value="">Todas</option>
            ${categories.map((c) => `<option value="${c}" ${c === catFilter ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>

        <div class="filter-group">
          <label for="f-brand">Marca</label>
          <select id="f-brand">
            <option value="">Todas</option>
            ${brands.map((b) => `<option value="${b}" ${b === brandFilter ? 'selected' : ''}>${b}</option>`).join('')}
          </select>
        </div>

        <div class="filter-group price-range">
          <label>Rango de precio</label>
          <div class="price-inputs">
            <input type="number" id="f-min" placeholder="Mín" min="0" step="1000" />
            <span>–</span>
            <input type="number" id="f-max" placeholder="Máx" min="0" step="1000" />
          </div>
        </div>

        <div class="filter-group">
          <label for="f-sort">Ordenar por</label>
          <select id="f-sort">
            <option value="relevancia">Relevancia</option>
            <option value="precio_asc">Precio: menor a mayor</option>
            <option value="precio_desc">Precio: mayor a menor</option>
            <option value="rating">Mejor calificados</option>
          </select>
        </div>

        <button class="btn btn-ghost btn-sm" id="f-reset" type="button">Limpiar filtros</button>
      </aside>

      <section class="catalog-results">
        <div class="results-meta" id="results-meta" role="status"></div>
        <div class="product-grid" id="product-grid"></div>
      </section>
    </div>
  </div>`;
}

export function bindCatalogEvents(query: URLSearchParams) {
  const all = getProducts();
  const grid = document.getElementById('product-grid') as HTMLElement;
  const meta = document.getElementById('results-meta') as HTMLElement;

  const searchInput = document.getElementById('f-search') as HTMLInputElement;
  const categorySelect = document.getElementById('f-category') as HTMLSelectElement;
  const brandSelect = document.getElementById('f-brand') as HTMLSelectElement;
  const minInput = document.getElementById('f-min') as HTMLInputElement;
  const maxInput = document.getElementById('f-max') as HTMLInputElement;
  const sortSelect = document.getElementById('f-sort') as HTMLSelectElement;
  const resetBtn = document.getElementById('f-reset') as HTMLButtonElement;

  searchInput.value = query.get('q') || '';

  function currentFilters(): Filters {
    return {
      q: searchInput.value.trim(),
      category: categorySelect.value,
      brand: brandSelect.value,
      minPrice: minInput.value ? Number(minInput.value) : null,
      maxPrice: maxInput.value ? Number(maxInput.value) : null,
      sort: sortSelect.value as Filters['sort'],
    };
  }

  function renderResults() {
    const filtered = applyFilters(all, currentFilters());
    meta.textContent = `${filtered.length} producto${filtered.length === 1 ? '' : 's'} encontrado${filtered.length === 1 ? '' : 's'}`;
    grid.innerHTML = filtered.length
      ? filtered.map(renderProductCard).join('')
      : `<p class="empty-state">No encontramos productos con esos filtros. Prueba ajustando el rango de precio o la categoría.</p>`;

    grid.querySelectorAll<HTMLButtonElement>('.add-to-cart').forEach((btn) => {
      btn.addEventListener('click', () => {
        addToCart(btn.dataset.id as string, 1);
        btn.textContent = 'Agregado ✓';
        setTimeout(() => (btn.textContent = 'Agregar'), 900);
        document.dispatchEvent(new CustomEvent('cart-updated'));
      });
    });
  }

  [searchInput].forEach((el) => el.addEventListener('input', renderResults));
  [categorySelect, brandSelect, sortSelect].forEach((el) => el.addEventListener('change', renderResults));
  [minInput, maxInput].forEach((el) => el.addEventListener('change', renderResults));

  resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    categorySelect.value = '';
    brandSelect.value = '';
    minInput.value = '';
    maxInput.value = '';
    sortSelect.value = 'relevancia';
    renderResults();
  });

  if (catFilterFromQuery(query)) categorySelect.value = catFilterFromQuery(query);
  if (brandFilterFromQuery(query)) brandSelect.value = brandFilterFromQuery(query);

  renderResults();
}

function catFilterFromQuery(query: URLSearchParams) {
  return query.get('cat') || '';
}
function brandFilterFromQuery(query: URLSearchParams) {
  return query.get('brand') || '';
}
