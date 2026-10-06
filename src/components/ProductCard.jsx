import { Link } from 'react-router-dom'
import { addToCart } from '../services/cartService'

function formatPrice(value) {
  return `$${Number(value).toLocaleString('es-CL')}`
}

function ProductCard({ product, onCartChange }) {
  const handleAdd = () => {
    addToCart(product)
    window.dispatchEvent(new Event('cartUpdated'))
    onCartChange?.()
  }

  return (
    <article className="product-card">
      {product.oferta && <span className="card-badge">Oferta</span>}
      <div className="product-img-box">
        <img src={product.img} alt={product.nombre} loading="lazy" />
      </div>
      <div className="product-info">
        <span className="product-category">{product.categoria}</span>
        <h3>{product.nombre}</h3>
        <div className="rating">★★★★☆ <span className="rating-count">(12)</span></div>
        {product.precioAnterior && (
          <div className="price-box">
            <span className="old-price">{formatPrice(product.precioAnterior)}</span>
            <span className="current-price">{formatPrice(product.precio)}</span>
          </div>
        )}
        {!product.precioAnterior && (
          <div className="price-box">
            <span className="current-price">{formatPrice(product.precio)}</span>
          </div>
        )}
        <div className="d-grid gap-2">
          <button className="btn-primary" type="button" onClick={handleAdd}>Agregar al Carrito</button>
          <Link className="btn btn-outline-secondary btn-sm" to={`/producto/${product.id}`}>Ver detalle</Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
