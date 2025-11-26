import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const originalFetch = (window as any).fetch;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AuthService] });
    service = TestBed.inject(AuthService);
    localStorage.removeItem('token');
  });

  afterEach(() => { (window as any).fetch = originalFetch; localStorage.removeItem('token'); });

  it('login() guarda token en localStorage cuando la API responde OK', async () => {
    (window as any).fetch = jasmine.createSpy().and.returnValue(Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: 'fake-jwt' })
    }));
    await service.login('u@x.com', 'pw');
    expect(localStorage.getItem('token')).toBe('fake-jwt');
  });

  it('login() lanza error en credenciales inválidas', async () => {
    (window as any).fetch = jasmine.createSpy().and.returnValue(Promise.resolve({ ok: false, status: 401 }));
    await expectAsync(service.login('a','b')).toBeRejected();
  });

  it('logout() elimina token', () => {
    localStorage.setItem('token', 't');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('isAuthenticated() refleja estado del token', () => {
    expect(service.isAuthenticated()).toBeFalse();
    localStorage.setItem('token', 'x');
    expect(service.isAuthenticated()).toBeTrue();
  });
});