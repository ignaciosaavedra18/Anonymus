import { Link } from 'react-router-dom'
import { getProducts } from '../services/productService'

function Categories() {
  const products = getProducts()
  const categories = ['notebooks', 'perifericos', 'monitores', 'componentes']

  return (
    <section>
      <div className="section-title-bar" style={{ borderColor: 'var(--border-color)' }}>
        <h2 style={{ color: 'var(--purple-700)' }}>Categorías</h2>
      </div>
      <div className="row g-4">
        {categories.map((category) => {
          const amount = products.filter((product) => product.categoria === category).length
          return (
            <div className="col-12 col-sm-6 col-lg-3" key={category}>
              <div className="product-card h-100">
                <span className="product-category">Categoría</span>
                <h3 style={{ textTransform: 'capitalize' }}>{category}</h3>
                <p>{amount} producto(s) disponibles.</p>
                <Link to={`/productos?categoria=${category}`} className="btn-primary btn-inline mt-auto">Ver productos</Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Categories
