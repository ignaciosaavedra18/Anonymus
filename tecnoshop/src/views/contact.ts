export const STORE_LOCATION = {
  lat: -33.4245,
  lng: -70.6153,
  label: 'Tecnoshop · Av. Providencia 1208, Providencia',
};

export function ContactView(): string {
  return `
  <div class="page contact-page">
    <div class="page-head">
      <h1>Contacto y soporte</h1>
      <p>¿Tienes dudas sobre un producto o un pedido? Escríbenos o visita nuestra tienda.</p>
    </div>

    <div class="contact-layout">
      <form id="contact-form" class="auth-form">
        <label for="c-name">Nombre</label>
        <input type="text" id="c-name" required placeholder="Tu nombre" />
        <label for="c-email">Correo electrónico</label>
        <input type="email" id="c-email" required placeholder="tu@correo.cl" />
        <label for="c-topic">Motivo</label>
        <select id="c-topic">
          <option>Consulta sobre un producto</option>
          <option>Estado de un pedido</option>
          <option>Reclamo o devolución</option>
          <option>Otro</option>
        </select>
        <label for="c-message">Mensaje</label>
        <textarea id="c-message" rows="5" required placeholder="Cuéntanos en qué te podemos ayudar"></textarea>
        <button type="submit" class="btn btn-primary btn-block">Enviar mensaje</button>
        <p class="feedback" id="contact-feedback" role="status"></p>
      </form>

      <div class="contact-map-col">
        <h2>Retiro en tienda</h2>
        <p class="hint">Av. Providencia 1208, Providencia, Santiago · Lun a sáb, 10:00–19:30</p>
        <div id="store-map" class="store-map" aria-label="Mapa de ubicación de Tecnoshop"></div>
        <a class="btn btn-ghost btn-sm" id="directions-link" target="_blank" rel="noopener">Cómo llegar</a>
      </div>
    </div>
  </div>`;
}

export async function bindContactEvents() {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedback = document.getElementById('contact-feedback') as HTMLElement;
    feedback.textContent = 'Gracias, recibimos tu mensaje. Te responderemos dentro de 24 horas hábiles.';
    form.reset();
  });

  const directionsLink = document.getElementById('directions-link') as HTMLAnchorElement | null;
  if (directionsLink) {
    directionsLink.href = `https://www.openstreetmap.org/directions?to=${STORE_LOCATION.lat},${STORE_LOCATION.lng}`;
  }

  const mapEl = document.getElementById('store-map');
  if (!mapEl) return;

  const L = await import('leaflet');
  const map = L.map(mapEl, {
    center: [STORE_LOCATION.lat, STORE_LOCATION.lng],
    zoom: 15,
    scrollWheelZoom: false,
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);
  L.marker([STORE_LOCATION.lat, STORE_LOCATION.lng]).addTo(map).bindPopup(STORE_LOCATION.label).openPopup();
}
