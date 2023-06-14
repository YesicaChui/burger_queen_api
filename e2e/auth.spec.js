import config from '../config.js';

const { fetch, fetchWithAuth } = process;

describe('POST /login', () => {
  it('debe responder con 400 cuando falta el correo electrónico y la contraseña', () => (
    fetch('/login', { method: 'POST' })
      .then((resp) => expect(resp.status).toBe(400))
  ));

  it('debe responder con 400 cuando falta el correo electrónico', () => (
    fetch('/login', {
      method: 'POST',
      body: { email: '', password: 'xxxx' },
    })
      .then((resp) => expect(resp.status).toBe(400))
  ));

  it('debe responder con 400 cuando falta la contraseña', () => (
    fetch('/login', {
      method: 'POST',
      body: { email: 'foo@bar.baz' },
    })
      .then((resp) => expect(resp.status).toBe(400))
  ));

  it('falla con 404 si las credenciales no coinciden', () => (
    fetch('/login', {
      method: 'POST',
      body: { email: `foo-${Date.now()}@bar.baz`, password: 'xxxx' },
    })
      .then((resp) => expect(resp.status).toBe(404))
  ));

  it('debe crear un nuevo token de autenticación y permitir el acceso usándolo', () => (
    fetch('/login', {
      method: 'POST',
      body: { email: config.adminEmail, password: config.adminPassword },
    })
      .then((resp) => {
        expect(resp.status).toBe(200);
        return resp.json();
      })
      .then((resp) => fetchWithAuth(resp.accessToken)(`/users/${resp.user.id}`))
      .then((resp) => {
        expect(resp.status).toBe(200);
        return resp.json();
      })
      .then((json) => expect(json.email).toBe(config.adminEmail))
  ));
});
