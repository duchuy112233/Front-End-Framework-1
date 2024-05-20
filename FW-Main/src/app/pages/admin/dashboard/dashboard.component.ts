import { Component, inject } from '@angular/core';
//
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
//
import { Product } from '../../../Types/Product';
import { ProductService } from '../../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgFor, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  products: Product[] = [];
  listProduct: Product[] = [];
  productService = inject(ProductService);
  constructor(private router: Router) {}

  // ngOnInit
  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.listProduct = this.products; // Gán danh sách sản phẩm cho listProduct sau khi nhận dữ liệu
      this.filter(); // Gọi phương thức filter() ngay sau khi nhận dữ liệu sản phẩm
    });
  }
  //
  filterValue: string = '';
  filter() {
    // Lọc các sản phẩm dựa trên từ khóa nhập vào
    this.products = this.listProduct.filter((p) =>
      p.title
        .toLocaleLowerCase()
        .includes(this.filterValue.trim().toLocaleLowerCase())
    );
  }

  //delete
  deleteMessage: string | null = null;
  handleDeleteProduct(id: any) {
    if (window.confirm('Bạn có chắc chắn muốn xoá không ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product.id !== id);
          // Hiển thị thông báo
          this.deleteMessage = 'Xoá thành công !';
          setTimeout(() => {
            this.deleteMessage = null;
          }, 2000);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  }
}
