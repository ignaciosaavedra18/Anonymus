import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { getProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'

function Home() {
  const products = useMemo(() => getProducts(), [])
  const destacados = products.slice(0, 8)

  return (
    <div className="home-container">
      <section className="hero-banner p-4 p-md-5 mb-4 text-white rounded-3 bg-primary">
        <div className="container-fluid py-3">
          <h1 className="display-5 fw-bold">Tu Setup al Siguiente Nivel</h1>
          <p className="col-md-8 fs-5">
            Encuentra los mejores notebooks, monitores, periféricos y componentes con ofertas exclusivas.
          </p>
          <div className="d-flex gap-2 mt-3">
            <Link to="/productos" className="btn btn-light btn-lg fw-semibold">
              Ver productos
            </Link>
            <Link to="/ofertas" className="btn btn-outline-light btn-lg">
              Ver ofertas
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-section mb-5">
        <div className="section-title-bar d-flex justify-content-between align-items-center mb-3">
          <h2 className="h3 m-0">Productos Destacados</h2>
          <Link to="/productos" className="text-decoration-none fw-semibold">
            Ver catálogo completo →
          </Link>
        </div>
        <div className="row g-3">
          {destacados.map((producto) => (
            <div className="col-12 col-md-6 col-xl-3" key={producto.id}>
              <ProductCard product={producto} />
            </div>
          ))}
        </div>
      </section>

      <section className="row g-4 mb-5">
        <div className="col-12 col-md-4">
          <div className="product-card h-100 p-3 d-flex flex-column">
            <span className="product-category">Categorías</span>
            <h3>Busca por tipo de producto</h3>
            <p>Notebooks, monitores, periféricos y componentes para tu setup.</p>
            <Link className="btn-primary btn-inline mt-auto text-center" to="/categorias">
              Ver categorías
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="product-card h-100 p-3 d-flex flex-column">
            <span className="product-category">Ofertas</span>
            <h3>Productos con descuento</h3>
            <p>Revisa los productos que tienen un precio especial dentro del catálogo.</p>
            <Link className="btn-primary btn-inline mt-auto text-center" to="/ofertas">
              Ver ofertas
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="product-card h-100 p-3 d-flex flex-column">
            <span className="product-category">Compra</span>
            <h3>Carrito y revision</h3>
            <p>Agrega productos y completa los datos de entrega para simular una compra.</p>
            <Link className="btn-primary btn-inline mt-auto text-center" to="/carrito">
              Ir al carrito
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-banner p-4 p-md-5 text-center bg-dark text-white rounded-3 mb-4">
        <h2 className="fw-bold">¿Listo para armar tu espacio de trabajo o juego?</h2>
        <p className="lead text-muted-light mb-4">
          Explora todo nuestro catálogo y aprovecha el despacho a todo el país.
        </p>
        <Link to="/productos" className="btn btn-primary btn-lg px-4 fw-semibold">
          Explorar Tienda Ahora
        </Link>
      </section>
    </div>
  )
}

export default Home
