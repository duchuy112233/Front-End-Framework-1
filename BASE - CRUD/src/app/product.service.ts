import { Injectable } from '@angular/core';
import { Product } from './types/Product';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  listProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // thêm sản phẩm
  addProduct(product: Product) {
    return this.http.post(`${this.apiUrl}`, product);
  }
  // Cập nhật sản phẩm

  editProduct(product: Product, id: string) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }
   // Chi tiết sản phẩm theo ID
   detailProduct(id: string | number | undefined) {
  
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }

}
