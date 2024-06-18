import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from './types/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiURL = 'http://localhost:3000/products';
  http = inject(HttpClient);
  listProduct() {
    return this.http.get<Product[]>(this.apiURL);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  addProduct(data: Product) {
    return this.http.post(`${this.apiURL}`, data);
  }

  editProduct(data: string, id: string) {
    return this.http.put(`${this.apiURL}/${id}`, data);
  }

  ByIdProduct(id: number | string | undefined) {
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }
}
