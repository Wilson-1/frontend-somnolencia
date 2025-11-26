import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsPage } from './settings.page';

class BleMock {
  pairDevice = jasmine.createSpy('pairDevice').and.returnValue(Promise.resolve({ id: 'd1', name: 'dev1' }));
}

describe('SettingsPage', () => {
  let page: SettingsPage;
  let ble: BleMock;

  beforeEach(() => {
    localStorage.clear();
    ble = new BleMock();
    page = new SettingsPage(ble as any);
    page.ngOnInit();
  });

  it('should create', () => {
    expect(page).toBeTruthy();
  });

  it('load() lee valores de localStorage por defecto', () => {
    expect(page.sensitivity).toBe(50);
    expect(page.threshold).toBe(0);
  });

  it('pair() usa BleService y guarda device en localStorage', async () => {
    await page.pair();
    expect(ble.pairDevice).toHaveBeenCalled();
    expect(localStorage.getItem('bleDeviceId')).toBe('d1');
    expect(page.bleDeviceId).toBe('d1');
  });

  it('unpair() elimina device de localStorage', () => {
    localStorage.setItem('bleDeviceId', 'x');
    localStorage.setItem('bleDeviceName', 'n');
    page.unpair();
    expect(localStorage.getItem('bleDeviceId')).toBeNull();
    expect(page.bleDeviceId).toBeNull();
  });

  it('save() persiste sensibilidad y threshold', () => {
    page.sensitivity = 77;
    page.threshold = 123;
    page.save();
    expect(localStorage.getItem('sensitivity')).toBe('77');
    expect(localStorage.getItem('threshold')).toBe('123');
  });
});
