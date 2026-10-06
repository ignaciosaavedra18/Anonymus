import { Link, useLocation } from 'react-router-dom'

function PurchaseResult({ success }) {
  const location = useLocation()
  const total = location.state?.total || 0

  return (
    <section className="text-center py-5">
      <div className="card p-5 shadow-sm border-0">
        <div style={{ fontSize: '4rem' }}>{success ? '✅' : '❌'}</div>
        <h1 className="mt-3">{success ? 'Compra realizada' : 'No se pudo realizar el pago'}</h1>
        <p>{success ? `Tu compra fue registrada correctamente. Total: $${Number(total).toLocaleString('es-CL')}.` : 'No se pudo completar la compra. Puedes volver al carrito e intentarlo nuevamente.'}</p>
        {success && <p className="text-secondary">Se generó un resumen de la operación.</p>}
        <Link className="btn btn-primary mt-3" to={success ? '/' : '/carrito'}>{success ? 'Volver al inicio' : 'Volver al carrito'}</Link>
      </div>
    </section>
  )
}

export default PurchaseResult
