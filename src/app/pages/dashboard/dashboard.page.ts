import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent],
  providers: [ApiService]
})
export class DashboardPage implements OnInit {
  summary: any = null;
  running = false;

  constructor(private api: ApiService) {}

  ngOnInit() { this.loadSummary(); }

  async loadSummary() {
    try { this.summary = await this.api.get('/trips/today'); }
    catch (e) { console.error(e); }
  }

  async toggleTrip() {
    try {
      if (!this.running) await this.api.post('/trips/start');
      else await this.api.post('/trips/stop');
      this.running = !this.running;
      await this.loadSummary();
    } catch (e) { console.error(e); }
  }
}
