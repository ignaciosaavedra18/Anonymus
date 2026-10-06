import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { changeQuantity, cartTotal, getCart, removeFromCart } from '../services/cartService'

function formatPrice(value) {
  return `$${Number(value).toLocaleString('es-CL')}`
}

function Cart() {
  const [cart, setCart] = useState(getCart())

  useEffect(() => {
    const refresh = () => setCart(getCart())
    window.addEventListener('cartUpdated', refresh)
    return () => window.removeEventListener('cartUpdated', refresh)
  }, [])

  const updateQuantity = (id, delta) => {
    const updated = changeQuantity(id, delta)
    setCart(updated)
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const remove = (id) => {
    setCart(removeFromCart(id))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const total = cartTotal(cart)

  if (cart.length === 0) {
    return (
      <section className="cart-items-box">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h3>Tu carrito está vacío</h3>
          <p>Agrega productos desde el catálogo para comenzar la compra.</p>
          <Link className="btn-primary btn-inline" to="/productos">Ver catálogo</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="cart-layout row g-4">
      <div className="col-12 col-lg-8">
        <div className="cart-items-box">
          <div className="table-responsive">
            <table className="data-table table align-middle mb-0">
              <thead>
                <tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td><div className="cart-product-cell"><img src={item.img} alt={item.nombre} /><span className="cart-product-name">{item.nombre}</span></div></td>
                    <td>{formatPrice(item.precio)}</td>
                    <td>
                      <div className="qty-stepper">
                        <button onClick={() => updateQuantity(item.id, -1)} type="button">−</button>
                        <span>{item.cantidad}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} type="button">+</button>
                      </div>
                    </td>
                    <td className="cart-subtotal-cell">{formatPrice(item.precio * item.cantidad)}</td>
                    <td><button type="button" className="btn-remove" onClick={() => remove(item.id)} aria-label={`Eliminar ${item.nombre}`}>🗑️</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <aside className="col-12 col-lg-4">
        <div className="cart-summary">
          <h3>Resumen de compra</h3>
          <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(total)}</strong></div>
          <div className="summary-row"><span>Despacho</span><strong>Gratis</strong></div>
          <div className="summary-row summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
          <Link className="btn-primary d-block text-center text-decoration-none" to="/checkout">Continuar compra</Link>
          <p className="summary-note">Puedes modificar las cantidades antes de finalizar.</p>
        </div>
      </aside>
    </section>
  )
}

export default Cart
