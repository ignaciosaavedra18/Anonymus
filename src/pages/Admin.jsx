import { useMemo, useState } from 'react'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../services/productService'

const emptyForm = { id: null, nombre: '', categoria: 'perifericos', precio: '', img: '/images/LogoTienda.jpg', oferta: false, precioAnterior: '' }

function Admin() {
  const [products, setProducts] = useState(getProducts())
  const [form, setForm] = useState(emptyForm)
  const [message, setMessage] = useState('')
  const extraProducts = useMemo(() => products.filter((product) => product.id > 19), [products])

  const refresh = () => setProducts(getProducts())

  const save = (event) => {
    event.preventDefault()
    if (!form.nombre.trim() || Number(form.precio) <= 0) {
      setMessage('Completa el nombre y un precio mayor a 0.')
      return
    }
    if (form.id) updateProduct(form)
    else createProduct(form)
    setForm(emptyForm)
    setMessage('Producto guardado correctamente.')
    refresh()
  }

  const edit = (product) => setForm({ ...product, precioAnterior: product.precioAnterior || '' })

  const remove = (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      deleteProduct(id)
      setMessage('Producto eliminado.')
      refresh()
    }
  }

  return (
    <section>
      <div className="section-title-bar" style={{ borderColor: 'var(--border-color)' }}>
        <h2 style={{ color: 'var(--purple-700)' }}>Panel administrativo</h2>
      </div>
      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <form className="login-caja" style={{ maxWidth: '100%' }} onSubmit={save}>
            <h2>{form.id ? `Editar #${form.id}` : 'Nuevo producto'}</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <div className="grupo-input"><label>Nombre</label><input value={form.nombre} onChange={(event) => setForm({ ...form, nombre: event.target.value })} /></div>
            <div className="grupo-input"><label>Categoría</label><select className="form-select" value={form.categoria} onChange={(event) => setForm({ ...form, categoria: event.target.value })}><option value="notebooks">Notebooks</option><option value="perifericos">Periféricos</option><option value="monitores">Monitores</option><option value="componentes">Componentes</option></select></div>
            <div className="grupo-input"><label>Precio</label><input type="number" value={form.precio} onChange={(event) => setForm({ ...form, precio: event.target.value })} /></div>
            <div className="grupo-input"><label>Ruta de imagen</label><input value={form.img} onChange={(event) => setForm({ ...form, img: event.target.value })} /></div>
            <div className="form-check mb-3"><input className="form-check-input" type="checkbox" checked={Boolean(form.oferta)} onChange={(event) => setForm({ ...form, oferta: event.target.checked })} id="oferta" /><label className="form-check-label" htmlFor="oferta">Marcar como oferta</label></div>
            <button className="btn-primario" type="submit">{form.id ? 'Guardar cambios' : 'Crear producto'}</button>
            {form.id && <button type="button" className="btn btn-outline-secondary w-100 mt-2" onClick={() => setForm(emptyForm)}>Cancelar edición</button>}
          </form>
        </div>
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="mb-3">Productos agregados por el administrador</h3>
              {extraProducts.length === 0 ? <p className="text-secondary">Todavía no hay productos creados desde el CRUD.</p> : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle"><thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>
                    {extraProducts.map((product) => <tr key={product.id}><td>{product.nombre}</td><td>{product.categoria}</td><td>${Number(product.precio).toLocaleString('es-CL')}</td><td className="d-flex gap-2"><button className="btn btn-sm btn-outline-primary" onClick={() => edit(product)}>Editar</button><button className="btn btn-sm btn-outline-danger" onClick={() => remove(product.id)}>Eliminar</button></td></tr>)}
                  </tbody></table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Admin
