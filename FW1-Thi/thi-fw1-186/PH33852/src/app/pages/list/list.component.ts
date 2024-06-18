import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../types/Product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],

  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products: Product[] = [];
  productService = inject(ProductService);

  ngOnInit() {
    this.productService.listProduct().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  handleSubmit(id: any) {
    if (window.confirm('xoa thanh cong')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter((prd) => prd.id !== id);
        },
        error: (error) => {
          console.log(error.message);
        },
      });
    }
  }
}
