import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  const originalFetch = (window as any).fetch;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ApiService] });
    service = TestBed.inject(ApiService);
    localStorage.removeItem('token');
  });

  afterEach(() => { (window as any).fetch = originalFetch; localStorage.removeItem('token'); });

  it('get() realiza fetch a la ruta correcta y retorna datos', async () => {
    localStorage.setItem('token','tok123');
    (window as any).fetch = jasmine.createSpy().and.callFake((url: string, opts: any) => {
      expect(url).toContain(`${service.apiBase}/test`);
      expect(opts.headers.Authorization).toBe('Bearer tok123');
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) });
    });
    const r = await service.get('/test');
    expect(r.ok).toBeTrue();
  });

  it('post() envía body y maneja respuesta', async () => {
    (window as any).fetch = jasmine.createSpy().and.callFake((url: string, opts: any) => {
      expect(opts.method).toBe('POST');
      expect(opts.body).toBe(JSON.stringify({ a: 1 }));
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1 }) });
    });
    const r = await service.post('/x', { a: 1 });
    expect(r.id).toBe(1);
  });

  it('get() lanza en error HTTP no OK', async () => {
    (window as any).fetch = jasmine.createSpy().and.returnValue(Promise.resolve({ ok: false, status: 500 }));
    await expectAsync(service.get('/err')).toBeRejected();
  });
});