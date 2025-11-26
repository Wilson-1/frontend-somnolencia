import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginPage } from './login.page';
import { AuthService } from '../../../services/auth.service';

class RouterMock { navigateByUrl = jasmine.createSpy('navigateByUrl'); }
class AuthMock { login = jasmine.createSpy('login').and.returnValue(Promise.resolve()); }

describe('LoginPage', () => {
  let component: LoginPage;
  let auth: AuthMock;
  let router: RouterMock;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
      { provide: AuthService, useClass: AuthMock },
      { provide: Router, useClass: RouterMock }
    ]});
    auth = TestBed.inject(AuthService) as unknown as AuthMock;
    router = TestBed.inject(Router) as unknown as RouterMock;
    component = new LoginPage(router as any, auth as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login() llama AuthService.login y navega en éxito', async () => {
    component.email = 'a@a.com';
    component.password = 'pw';
    await component.login();
    expect(auth.login).toHaveBeenCalledWith('a@a.com', 'pw');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard', { replaceUrl: true });
  });

  it('login() muestra toast en error', async () => {
    (auth.login as any).and.returnValue(Promise.reject(new Error('fail')));
    await component.login();
    expect(component.toastMsg).toContain('fail');
  });
});
