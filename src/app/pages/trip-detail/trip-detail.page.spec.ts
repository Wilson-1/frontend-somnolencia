import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripDetailPage } from './trip-detail.page';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

class ApiMock {
  getTrip = jasmine.createSpy('getTrip').and.returnValue(Promise.resolve({ id: 't1', events: [{ type: 'blink' }] }));
}

class RouteMock {
  snapshot = { paramMap: { get: (_: string) => 't1' } };
}

describe('TripDetailPage', () => {
  let component: TripDetailPage;
  let fixture: ComponentFixture<TripDetailPage>;
  let api: ApiMock;
  let route: RouteMock;

  beforeEach(async () => {
    api = new ApiMock();
    route = new RouteMock();
    fixture = TestBed.createComponent(TripDetailPage);
    component = fixture.componentInstance;
    component['route'] = route as any;
    component['api'] = api as any;
    fixture.detectChanges();
    if (typeof (component as any).ngOnInit === 'function') {
      await (component as any).ngOnInit();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads trip using ApiService and sets tripId/events', () => {
    expect(api.getTrip).toHaveBeenCalledWith('t1');
    expect((component as any).tripId).toBe('t1');
    expect((component as any).events).toBeDefined();
    expect((component as any).events.length).toBeGreaterThanOrEqual(0);
  });
});
