import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './Types/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiURL = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}
  //Get all
  getProducts() {
    return this.http.get<Product[]>(this.apiURL);
  }
  // detaill
  getProductById(id: string | number | undefined) {
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }
  //
    // deleteProduct
    deleteProduct(id: number) {
      return this.http.delete(`${this.apiURL}/${id}`);
    }


}
