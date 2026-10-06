import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { getProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'

function Home() {
  const products = useMemo(() => getProducts(), [])
  const destacados = products.slice(0, 8)

  return (
    <>
      <section className="main-banner">
        <div className="section-title-bar">
          <h2>Tendencias y Descuentos</h2>
          <Link to="/productos">Ver catálogo completo →</Link>
        </div>
        <div className="row g-3">
          {destacados.map((product) => (
            <div className="col-12 col-md-6 col-xl-3" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section className="row g-4 mt-1">
        <div className="col-12 col-md-4">
          <div className="product-card h-100">
            <span className="product-category">Categorías</span>
            <h3>Busca por tipo de producto</h3>
            <p>Notebooks, monitores, periféricos y componentes para tu setup.</p>
            <Link className="btn-primary btn-inline mt-auto" to="/categorias">Ver categorías</Link>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="product-card h-100">
            <span className="product-category">Ofertas</span>
            <h3>Productos con descuento</h3>
            <p>Revisa los productos que tienen un precio especial dentro del catálogo.</p>
            <Link className="btn-primary btn-inline mt-auto" to="/ofertas">Ver ofertas</Link>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="product-card h-100">
            <span className="product-category">Compra</span>
            <h3>Carrito y checkout</h3>
            <p>Agrega productos y completa los datos de entrega para simular una compra.</p>
            <Link className="btn-primary btn-inline mt-auto" to="/carrito">Ir al carrito</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
