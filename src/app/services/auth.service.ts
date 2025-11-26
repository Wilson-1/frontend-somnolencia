import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiBase = 'https://api.example.com';

  async login(email: string, password: string) {
    const res = await fetch(`${this.apiBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Credenciales inválidas');
    const { token } = await res.json();
    localStorage.setItem('token', token);
  }

  logout() { localStorage.removeItem('token'); }

  getToken() { return localStorage.getItem('token'); }

  isAuthenticated() {
    const t = this.getToken(); return !!t;
  }
}