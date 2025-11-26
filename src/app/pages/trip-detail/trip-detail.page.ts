import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TripDetailPage implements OnInit {
  events: any[] = []; // <-- define la propiedad usada en la plantilla

  constructor() { }

  ngOnInit() {
  }

}
