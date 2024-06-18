import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Register } from './types/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = 'http://localhost:3000';
  http = inject(HttpClient);
  Register(data: Register) {
    return this.http.post(`${this.apiURL}/register`, data);
  }
  Login(data: any) {
    return this.http.post(`${this.apiURL}/login`, data);
  }
}
