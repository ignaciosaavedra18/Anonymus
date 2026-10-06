import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { getProducts } from '../services/productService'

function Products() {
  const [searchParams] = useSearchParams()
  const [products] = useState(() => getProducts())
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('categoria') || 'todas')
  const [maxPrice, setMaxPrice] = useState('')

  const categories = useMemo(() => [...new Set(products.map((product) => product.categoria))], [products])

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesSearch = !term || product.nombre.toLowerCase().includes(term) || product.categoria.toLowerCase().includes(term)
      const matchesCategory = category === 'todas' || product.categoria === category
      const matchesPrice = !maxPrice || product.precio <= Number(maxPrice)
      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [products, search, category, maxPrice])

  useEffect(() => {
    document.title = 'TecnoShop - Catálogo'
  }, [])

  return (
    <section>
      <div className="section-title-bar" style={{ borderColor: 'var(--border-color)' }}>
        <h2 style={{ color: 'var(--purple-700)' }}>Catálogo de Productos</h2>
        <span>{filteredProducts.length} producto(s)</span>
      </div>

      <div className="card p-3 mb-4 shadow-sm border-0">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-5">
            <label className="form-label">Buscar</label>
            <input className="form-control" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ej: Logitech, monitor, Ryzen..." />
          </div>
          <div className="col-12 col-md-3">
            <label className="form-label">Categoría</label>
            <select className="form-select" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="todas">Todas</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="form-label">Precio máximo</label>
            <input type="number" className="form-control" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Ej: 200000" />
          </div>
          <div className="col-12 col-md-1">
            <button type="button" className="btn btn-outline-secondary w-100" onClick={() => { setSearch(''); setCategory('todas'); setMaxPrice('') }}>Limpiar</button>
          </div>
        </div>
      </div>

      <ProductGrid products={filteredProducts} />
    </section>
  )
}

export default Products
