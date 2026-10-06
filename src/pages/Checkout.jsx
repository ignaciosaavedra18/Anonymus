import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cartTotal, clearCart, getCart } from '../services/cartService'

function Checkout() {
  const navigate = useNavigate()
  const cart = getCart()
  const [form, setForm] = useState({ nombre: '', direccion: '', comuna: '', telefono: '', entrega: 'domicilio', pago: 'tarjeta' })
  const [error, setError] = useState('')

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const submit = (event) => {
    event.preventDefault()
    if (!form.nombre.trim() || !form.direccion.trim() || !form.comuna.trim() || !form.telefono.trim()) {
      setError('Completa todos los datos de entrega antes de continuar.')
      return
    }
    clearCart()
    navigate('/compra-exitosa', { state: { total: cartTotal(cart), entrega: form.entrega } })
  }

  if (cart.length === 0) {
    return <div className="alert alert-info">No tienes productos para comprar. <Link to="/productos">Volver al catálogo</Link>.</div>
  }

  return (
    <section>
      <div className="section-title-bar" style={{ borderColor: 'var(--border-color)' }}>
        <h2 style={{ color: 'var(--purple-700)' }}>Checkout</h2>
        <span>Datos de entrega y pago</span>
      </div>
      <form className="card p-4 shadow-sm" onSubmit={submit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row g-3">
          <div className="col-12 col-md-6"><label className="form-label">Nombre completo</label><input className="form-control" name="nombre" value={form.nombre} onChange={handleChange} /></div>
          <div className="col-12 col-md-6"><label className="form-label">Teléfono</label><input className="form-control" name="telefono" value={form.telefono} onChange={handleChange} /></div>
          <div className="col-12"><label className="form-label">Dirección</label><input className="form-control" name="direccion" value={form.direccion} onChange={handleChange} /></div>
          <div className="col-12 col-md-6"><label className="form-label">Comuna</label><input className="form-control" name="comuna" value={form.comuna} onChange={handleChange} /></div>
          <div className="col-12 col-md-6"><label className="form-label">Entrega</label><select className="form-select" name="entrega" value={form.entrega} onChange={handleChange}><option value="domicilio">Despacho a domicilio</option><option value="retiro">Retiro en tienda</option></select></div>
          <div className="col-12 col-md-6"><label className="form-label">Medio de pago</label><select className="form-select" name="pago" value={form.pago} onChange={handleChange}><option value="tarjeta">Tarjeta</option><option value="transferencia">Transferencia</option></select></div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
          <strong>Total: ${Number(cartTotal(cart)).toLocaleString('es-CL')}</strong>
          <div className="d-flex gap-2 flex-wrap"><Link to="/carrito" className="btn btn-outline-secondary">Volver</Link><Link to="/compra-fallida" className="btn btn-outline-danger">Simular pago rechazado</Link><button type="submit" className="btn btn-primary">Confirmar compra</button></div>
        </div>
      </form>
    </section>
  )
}

export default Checkout
