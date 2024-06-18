import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AdminService } from '../../admin.service';
import { Product } from '../../types/product';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];
  produstSev = inject(AdminService);
  ngOnInit() {
    this.produstSev.listPrd().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  Hendelete(id: any) {
    if (window.confirm('Dang ky thanh cong - ve login')) {
      this.produstSev.deletetPrd(id).subscribe({
        next: () => {
          this.products = this.products.filter((prod) => prod.id !== id);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  }
}
