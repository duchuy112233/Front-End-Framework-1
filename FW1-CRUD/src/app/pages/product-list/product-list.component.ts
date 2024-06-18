import { Component, inject } from '@angular/core';
import { Product } from '../../types/Product';
import { ProductService } from '../../product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  productService = inject(ProductService);
  deleteMessage: string | null = null;
  //
  ngOnInit() {
    this.productService.listProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }

  //

  handleDeleteProduct(id: any) {
    this.deleteMessage = 'Xoá thành công !';
    setTimeout(() => {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product.id !== id);
          this.filteredProducts = this.filteredProducts.filter(
            (product) => product.id !== id
          );
        },
        error: (error) => {
          console.error(error.message);
        },
      });

      this.deleteMessage = null;
    }, 1500);
  }
}
