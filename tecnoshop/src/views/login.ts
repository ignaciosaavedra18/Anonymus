import { login, register, getSession } from '../state/store';
import { navigate } from '../router';

export function LoginView(query: URLSearchParams): string {
  const session = getSession();
  const next = query.get('next') || '';

  if (session) {
    return `<div class="page"><p class="empty-state">Ya tienes sesión iniciada como <strong>${session.name}</strong>. <a href="#/${next || ''}">Continuar</a></p></div>`;
  }

  return `
  <div class="page auth-page">
    <div class="auth-tabs">
      <button class="auth-tab active" data-tab="login">Iniciar sesión</button>
      <button class="auth-tab" data-tab="register">Crear cuenta</button>
    </div>

    <form id="login-form" class="auth-form">
      <h1>Iniciar sesión</h1>
      <label for="login-email">Correo electrónico</label>
      <input type="email" id="login-email" required placeholder="tu@correo.cl" />
      <label for="login-password">Contraseña</label>
      <input type="password" id="login-password" required placeholder="••••••••" />
      <p class="feedback" id="login-feedback" role="alert"></p>
      <button type="submit" class="btn btn-primary btn-block">Entrar</button>
      <p class="hint">Cuenta de prueba: ignacio.saavedra@tecnoshop.cl / Demo1234</p>
    </form>

    <form id="register-form" class="auth-form" hidden>
      <h1>Crear cuenta</h1>
      <label for="reg-name">Nombre completo</label>
      <input type="text" id="reg-name" required placeholder="Nombre y apellido" />
      <label for="reg-email">Correo electrónico</label>
      <input type="email" id="reg-email" required placeholder="tu@correo.cl" />
      <label for="reg-password">Contraseña</label>
      <input type="password" id="reg-password" required minlength="4" placeholder="Mínimo 4 caracteres" />
      <p class="feedback" id="register-feedback" role="alert"></p>
      <button type="submit" class="btn btn-primary btn-block">Registrarme</button>
    </form>
  </div>`;
}

export function bindLoginEvents(query: URLSearchParams) {
  const next = query.get('next') || '';
  const tabs = document.querySelectorAll<HTMLButtonElement>('.auth-tab');
  const loginForm = document.getElementById('login-form') as HTMLFormElement | null;
  const registerForm = document.getElementById('register-form') as HTMLFormElement | null;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const isLogin = tab.dataset.tab === 'login';
      loginForm?.toggleAttribute('hidden', !isLogin);
      registerForm?.toggleAttribute('hidden', isLogin);
    });
  });

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (document.getElementById('login-email') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;
    const user = login(email, password);
    const feedback = document.getElementById('login-feedback') as HTMLElement;
    if (!user) {
      feedback.textContent = 'Correo o contraseña incorrectos.';
      return;
    }
    document.dispatchEvent(new CustomEvent('session-changed'));
    navigate(next ? `/${next}` : '/');
  });

  registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('reg-name') as HTMLInputElement).value;
    const email = (document.getElementById('reg-email') as HTMLInputElement).value;
    const password = (document.getElementById('reg-password') as HTMLInputElement).value;
    const result = register(name, email, password);
    const feedback = document.getElementById('register-feedback') as HTMLElement;
    if ('error' in result) {
      feedback.textContent = result.error;
      return;
    }
    document.dispatchEvent(new CustomEvent('session-changed'));
    navigate(next ? `/${next}` : '/');
  });
}
