import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Product } from '../../../Types/Product';
import { ProductService } from '../../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgFor, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Note the plural 'styleUrls'
})
export class DashboardComponent {
  products: Product[] = [];
  listProduct: Product[] = [];
  filteredProducts: Product[] = [];
  productService = inject(ProductService);

  currentPage: number = 1;
  itemsPerPage: number = 5; // 10 items per page

  filterValue: string = '';
  deleteMessage: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.listProduct = this.products; // Assign listProduct after receiving data
      this.filter(); // Call filter() method after receiving product data
    });
  }

  filter() {
    // Filter products based on the search input
    this.filteredProducts = this.listProduct.filter((p) =>
      p.title
        .toLocaleLowerCase()
        .includes(this.filterValue.trim().toLocaleLowerCase())
    );
    this.currentPage = 1; // Reset to first page on new filter
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  handleDeleteProduct(id: any) {
    // if (window.confirm('Bạn có chắc chắn muốn xoá không ?')) {

    this.deleteMessage = 'Xoá thành công !';
    setTimeout(() => {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product.id !== id);
          this.filteredProducts = this.filteredProducts.filter(
            (product) => product.id !== id
          );
          // Show delete message
        },
        error: (error) => {
          console.error(error.message);
        },
      });

      this.deleteMessage = null;
    }, 1500);

    // }
  }
}
