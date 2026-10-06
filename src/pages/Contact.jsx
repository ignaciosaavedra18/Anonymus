import { useState } from 'react'

function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <section className="contact-section">
      <div className="contact-header"><h2>Contacto</h2><p>Escríbenos y te ayudaremos con tu consulta.</p></div>
      <div className="contact-grid row g-4">
        <div className="col-12 col-lg-5 contact-info-cards">
          <div className="info-card"><div className="info-icon">📍</div><div className="info-text"><h3>Dirección</h3><p>Santiago, Chile</p></div></div>
          <div className="info-card"><div className="info-icon">📧</div><div className="info-text"><h3>Correo</h3><p>contacto@tecnoshop.cl</p></div></div>
        </div>
        <form className="contact-form-wrapper col-12 col-lg-7" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
          <h3>Formulario de contacto</h3>
          <div className="form-row">
            <div className="form-group"><label>Nombre</label><input required /></div>
            <div className="form-group"><label>Correo</label><input type="email" required /></div>
          </div>
          <div className="form-group mt-3"><label>Mensaje</label><textarea rows="5" required /></div>
          <button className="btn btn-primary btn-submit-contact mt-3" type="submit">Enviar mensaje</button>
          {sent && <div className="alert-success">Mensaje enviado correctamente.</div>}
        </form>
      </div>
    </section>
  )
}

export default Contact
