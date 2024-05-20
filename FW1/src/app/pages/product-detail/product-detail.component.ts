import { Component,OnInit  } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { Product } from '../../../Types/Products';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  productID: string | number | undefined;
  product: Product | undefined;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.productID = this.route.snapshot.params['id'];
    console.log(this.productID);
    this.productService.getProductDetail(this.productID).subscribe((p) => {
      this.product = p;
    });
  }
}
