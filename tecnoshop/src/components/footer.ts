export function renderFooter(): string {
  const year = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-col">
        <span class="brand-name">Tecnoshop</span>
        <p>Tienda online de tecnología: computadores, celulares, tablets, smartwatches, monitores, audífonos y accesorios.</p>
      </div>
      <div class="footer-col">
        <h3>Ayuda</h3>
        <a href="#/contacto">Contacto y soporte</a>
        <a href="#/pedidos">Seguimiento de pedidos</a>
        <a href="#/catalogo">Catálogo completo</a>
      </div>
      <div class="footer-col">
        <h3>Retiro en tienda</h3>
        <p>Av. Providencia 1208, Providencia, Santiago</p>
        <p>Lun a sáb, 10:00–19:30</p>
      </div>
    </div>
    <div class="footer-bottom">© ${year} Tecnoshop. Proyecto académico DSY1104.</div>
  </footer>`;
}
