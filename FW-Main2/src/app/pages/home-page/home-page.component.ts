import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../Types/Product';
import { ProductService } from '../../product.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, NgFor, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  products: Product[] = [];
  listProduct: Product[] = [];
  filteredProducts: Product[] = [];
  ProductService = inject(ProductService);

  currentPage: number = 1;
  itemsPerPage: number = 8; // 2 rows * 4 columns

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.listProduct = this.products;
      this.filter();
    });
  }

  filterValue: string = '';
  filter() {
    this.filteredProducts = this.listProduct.filter((p) =>
      p.title.toLocaleLowerCase().includes(this.filterValue.trim().toLocaleLowerCase())
    );
    this.currentPage = 1; // Reset to first page on new filter
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
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

  addToCart(product: Product) {
    console.log(`Added to cart successfully: ${product.title}`);
  }
}
