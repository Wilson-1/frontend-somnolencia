import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPage } from './dashboard.page';
import { ApiService } from '../../../services/api.service';

class ApiMock {
  get = jasmine.createSpy('get').and.returnValue(Promise.resolve({ summary: { x: 1 }, lastEvent: { id: 'e1' } }));
  post = jasmine.createSpy('post').and.returnValue(Promise.resolve({}));
}

describe('DashboardPage', () => {
  let page: DashboardPage;
  let api: ApiMock;

  beforeEach(() => {
    api = new ApiMock();
    page = new DashboardPage(api as any);
  });

  it('should create', () => {
    expect(page).toBeTruthy();
  });

  it('loadSummary() carga resumen', async () => {
    await page.loadSummary();
    expect(api.get).toHaveBeenCalledWith('/trips/today');
    expect(page.summary.summary.x).toBe(1);
  });

  it('toggleTrip() inicia y para viaje y actualiza running', async () => {
    page.running = false;
    await page.toggleTrip();
    expect(api.post).toHaveBeenCalledWith('/trips/start');
    expect(page.running).toBeTrue();

    await page.toggleTrip();
    expect(api.post).toHaveBeenCalledWith('/trips/stop');
    expect(page.running).toBeFalse();
  });
});
