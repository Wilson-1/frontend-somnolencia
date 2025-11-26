import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonRange, IonInput } from '@ionic/angular';
import { BleService } from '../../services/ble.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonItem, IonLabel, IonRange, IonInput],
  providers: [BleService]
})
export class SettingsPage implements OnInit {
  bleDeviceId: string | null = null;
  deviceName: string | null = null;
  sensitivity = 50;
  threshold = 0;
  calibrating = false;
  calibrationSeconds = 5;

  constructor(private ble: BleService) {}

  ngOnInit() { this.load(); }

  load() {
    this.bleDeviceId = localStorage.getItem('bleDeviceId');
    this.deviceName = localStorage.getItem('bleDeviceName');
    this.sensitivity = Number(localStorage.getItem('sensitivity') || '50');
    this.threshold = Number(localStorage.getItem('threshold') || '0');
  }

  async pair() {
    try {
      const d = await this.ble.pairDevice();
      this.bleDeviceId = d.id; this.deviceName = d.name || 'BLE';
      localStorage.setItem('bleDeviceId', this.bleDeviceId || ''); localStorage.setItem('bleDeviceName', this.deviceName || '');
    } catch (e) { console.error(e); }
  }

  unpair() {
    localStorage.removeItem('bleDeviceId'); localStorage.removeItem('bleDeviceName');
    this.bleDeviceId = this.deviceName = null;
  }

  save() {
    localStorage.setItem('sensitivity', String(this.sensitivity));
    localStorage.setItem('threshold', String(this.threshold));
  }

  async calibrate() {
    this.calibrating = true;
    try {
      // simple simulated calibration; replace with real samples from BLE
      const samples: number[] = [];
      const interval = 250;
      const iterations = Math.max(4, Math.floor(this.calibrationSeconds * 1000 / interval));
      for (let i=0;i<iterations;i++){
        samples.push(100 + Math.round(Math.random()*20-10));
        await new Promise(r => setTimeout(r, interval));
      }
      const mean = samples.reduce((s,v)=>s+v,0)/samples.length;
      const variance = samples.reduce((s,v)=>s+(v-mean)*(v-mean),0)/samples.length;
      const std = Math.sqrt(variance);
      this.threshold = Math.round(mean + 1.5*std);
      localStorage.setItem('threshold', String(this.threshold));
    } finally { this.calibrating = false; }
  }
}
