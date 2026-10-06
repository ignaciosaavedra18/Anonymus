import { Link, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { getProductById } from '../services/productService'
import { addToCart } from '../services/cartService'

function ProductDetail() {
  const { id } = useParams()
  const product = useMemo(() => getProductById(id), [id])

  if (!product) {
    return <div className="alert alert-warning">Producto no encontrado.</div>
  }

  const add = () => {
    addToCart(product)
    window.dispatchEvent(new Event('cartUpdated'))
  }

  return (
    <section>
      <div className="mb-3">
        <Link to="/productos" className="btn btn-sm btn-outline-secondary">← Volver al catálogo</Link>
      </div>
      <div className="detalle-contenedor row g-4">
        <div className="detalle-imagen col-12 col-lg-6">
          <img src={product.img} alt={product.nombre} />
        </div>
        <div className="detalle-info col-12 col-lg-6">
          <span className="product-category">{product.categoria}</span>
          <h1>{product.nombre}</h1>
          <p className="detalle-descripcion">Producto disponible en TecnoShop. Vista de detalle integrada al catálogo React para la evaluación.</p>
          {product.precioAnterior && <p className="old-price">${Number(product.precioAnterior).toLocaleString('es-CL')}</p>}
          <div className="detalle-precio">${Number(product.precio).toLocaleString('es-CL')}</div>
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn-comprar" type="button" onClick={add}>Agregar al carrito</button>
            <Link className="btn btn-outline-primary align-self-center" to="/carrito">Ir al carrito</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
