import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from './Types/Product';// Điều chỉnh đường dẫn theo cấu trúc dự án của bạn
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL = 'http://localhost:3000/products';

  constructor(private http: HttpClient, private router: Router) {}

  // Lấy tất cả sản phẩm
  getAllProducts() {
    return this.http.get<Product[]>(this.apiURL).pipe(
      //
      catchError(error => {
        this.router.navigate(['/not-found']);
        return throwError(error);
      })
    );
  }

  // Chi tiết sản phẩm theo ID
  detailProduct(id: string | number | undefined) {
    if (id === undefined) {
      this.router.navigate(['/not-found']);
      return throwError('ID is undefined');
    }
    return this.http.get<Product>(`${this.apiURL}/${id}`).pipe(
      //
      catchError(error => {
        this.router.navigate(['/not-found']);
        return throwError(error);
      })
    );
  }

  // Xóa sản phẩm theo ID
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`).pipe(
      //
      catchError(error => {
        this.router.navigate(['/not-found']);
        return throwError(error);
      })
    );
  }
  // thêm sản phẩm
  createProduct(product: Product) {
    return this.http.post(`${this.apiURL}`, product);
  }
    // Cập nhật sản phẩm
  
    updateProductById(product: Product, id: string) {
      return this.http.put<Product>(`${this.apiURL}/${id}`, product);
    }
}
