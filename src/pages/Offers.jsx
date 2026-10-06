import { getProducts } from '../services/productService'
import ProductGrid from '../components/ProductGrid'

function Offers() {
  const products = getProducts().filter((product) => product.oferta)
  return (
    <section>
      <div className="section-title-bar" style={{ borderColor: 'var(--border-color)' }}>
        <h2 style={{ color: 'var(--purple-700)' }}>Ofertas</h2>
        <span>Productos con precio especial</span>
      </div>
      <ProductGrid products={products} />
    </section>
  )
}

export default Offers
