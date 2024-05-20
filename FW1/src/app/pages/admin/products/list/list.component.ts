import { Component, inject } from '@angular/core';
import { Product } from '../../../../../Types/Products';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-Product-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgFor, FormsModule],

  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ProductListComponent{
  products: Product[] = [];
  productService = inject(ProductService);

  // ngOnInit

  ngOnInit(): void {
    this.productService
      .getAllProduct()
      .subscribe((data) => (this.products = data));
  }
  constructor() {}
  filterValue: string = '';
  filter() {
    //chọn sản phẩm có tên chưa tên giá trị nhập vào
    this.products = this.products.filter((p) =>
      p.title.toLocaleLowerCase().includes(this.filterValue.toLocaleLowerCase())
    );
  }
  // //

  deleteMessage: string | null = null;
  deleteProduct(product: any) {
    if (window.confirm('Bạn có chắc chắn muốn xoá không!')) {
      this.productService.deleteProduct(product).subscribe({
        next: () => {
          // Thực hiện xoá sản phẩm khỏi danh sách
          this.products = this.products.filter((p) => p !== product);
        },
        error: (error) => {
          console.error(error.message);
          // Hiển thị thông báo
          this.deleteMessage = 'Đang xoá ...';
          // Chờ 1 giây sau đó xoá thông báo
          setTimeout(() => {
            this.deleteMessage = null;
          }, 1000);
        },
      });
    }
  }
}
