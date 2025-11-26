import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonToast } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton, IonItem, IonLabel, IonToast],
  providers: [AuthService]
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;
  toastMsg = '';

  constructor(private router: Router, private auth: AuthService) {}

  async login() {
    this.loading = true;
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    } catch (e: any) {
      this.toastMsg = e?.message || 'Error de autenticación';
    } finally {
      this.loading = false;
    }
  }

  clearToast() { this.toastMsg = ''; }
}
