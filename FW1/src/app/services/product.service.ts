import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../Types/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  apiURL = 'http://localhost:3000/products';

  constructor() {}

  // controllers - nodejs
  //getall
  getAllProduct() {
    return this.http.get<Product[]>(this.apiURL);
  }
  // getProductDetail
 
  getProductDetail(id: string | number | undefined) {
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }
  // createProduct
  // updateProduct
  // deleteProduct
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
