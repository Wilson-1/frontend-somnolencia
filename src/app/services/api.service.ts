import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  apiBase = 'Cambiar por la URL base de la API';

  private get headers() {
    const token = localStorage.getItem('token');
    return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  }

  async get(path: string) {
    const res = await fetch(`${this.apiBase}${path}`, { headers: this.headers });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  }

  async post(path: string, body?: any) {
    const res = await fetch(`${this.apiBase}${path}`, { method: 'POST', headers: this.headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.status === 204 ? null : await res.json();
  }

  async put(path: string, body: any) {
    const res = await fetch(`${this.apiBase}${path}`, { method: 'PUT', headers: this.headers, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  }
}