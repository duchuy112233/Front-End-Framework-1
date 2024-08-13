import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../types/Product';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, CommonModule, NgFor],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];
  limitedProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }


  
}
