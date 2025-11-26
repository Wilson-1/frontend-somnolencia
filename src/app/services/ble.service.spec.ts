import { TestBed } from '@angular/core/testing';
import { BleService } from './ble.service';

describe('BleService', () => {
  let service: BleService;
  const originalBluetooth = (navigator as any).bluetooth;

  beforeEach(() => { TestBed.configureTestingModule({ providers: [BleService] }); service = TestBed.inject(BleService); });
  afterEach(() => { (navigator as any).bluetooth = originalBluetooth; });

  it('pairDevice() rechaza si Web Bluetooth no está disponible', async () => {
    (navigator as any).bluetooth = undefined;
    await expectAsync(service.pairDevice()).toBeRejectedWithError('Web Bluetooth no disponible');
  });

  it('pairDevice() llama requestDevice cuando está disponible', async () => {
    const fakeDevice = { id: 'd1', name: 'dev' };
    (navigator as any).bluetooth = { requestDevice: jasmine.createSpy().and.returnValue(Promise.resolve(fakeDevice)) };
    const d = await service.pairDevice();
    expect(d).toBe(fakeDevice);
  });
});