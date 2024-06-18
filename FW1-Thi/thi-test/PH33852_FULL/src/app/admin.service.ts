import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from './types/product';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiURL = 'http://localhost:3000/products';
  http = inject(HttpClient);
  listPrd() {
    return this.http.get<Product[]>(this.apiURL);
  }
  deletetPrd(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  addtPrd(prd: Product) {
    return this.http.post(`${this.apiURL}`, prd); 
  }
  editPrd(prd: Product, id: string) {
    return this.http.put(`${this.apiURL}/${id}`, prd);
  }
  ByIDPrd(id: string | number | undefined) {
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }
}
