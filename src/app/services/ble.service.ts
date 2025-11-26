import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BleService {
  async pairDevice(): Promise<any> {
    if (!(navigator as any).bluetooth) throw new Error('Web Bluetooth no disponible');
    const device = await (navigator as any).bluetooth.requestDevice({ acceptAllDevices: true, optionalServices: ['heart_rate'] });
    // nota: guardar id/name en settings si se desea
    return device;
  }

  async connectToDevice(device: any) {
    if (!device.gatt) throw new Error('Device no soporta GATT');
    const server = await device.gatt.connect();
    return server;
  }

  // ejemplo: leer característica (serviceUuid, charUuid)
  async readCharacteristic(server: any, serviceUuid: string, charUuid: string) {
    const service = await server.getPrimaryService(serviceUuid);
    const c = await service.getCharacteristic(charUuid);
    const value = await c.readValue();
    // convertir DataView a número simple
    return value.getUint8(0);
  }
}