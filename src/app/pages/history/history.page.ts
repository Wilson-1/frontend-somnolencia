import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/angular';
import { ApiService } from '../../services/api.service'; // <-- ruta corregida

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonInput, IonButton],
  providers: [ApiService]
})
export class HistoryPage implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  chart: any = null;
  month = new Date().toISOString().slice(0,7); // YYYY-MM

  constructor(private api: ApiService) {}

  ngAfterViewInit() { this.loadData(); }

  async loadData() {
    try {
      const data = await this.api.get(`/history?month=${this.month}`);
      this.renderChart(data.days || [], data.values || []);
    } catch (e) { console.error(e); this.renderChart([], []); }
  }

  async renderChart(labels: string[], values: number[]) {
    if (this.chart) this.chart.destroy();
    const ctx = this.canvas.nativeElement.getContext('2d')!;
    const ChartMod = await import('chart.js/auto');
    const Chart = ChartMod.default ?? ChartMod;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: [{ label: 'Eventos', data: values, borderColor: '#3880ff', backgroundColor: 'rgba(56,128,255,0.15)' }] },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}
