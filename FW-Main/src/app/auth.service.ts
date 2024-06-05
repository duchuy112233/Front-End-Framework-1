import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Register } from './Types/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000';
  http = inject(HttpClient);


  register(data: Register) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
