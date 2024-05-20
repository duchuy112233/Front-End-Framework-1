import { Component, OnInit } from '@angular/core';
import { Product } from '../../Types/Product';
import { ActivatedRoute ,Router} from '@angular/router';
import { ProductService } from '../../product.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})



export class ProductDetailsComponent implements OnInit {
  productID: string | number | undefined;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productID = this.route.snapshot.params['id'];
    console.log(this.productID);
    this.productService.detailProduct(this.productID)
      .pipe(
        catchError((error) => {
          console.error('Product not found', error);
          this.router.navigate(['/not-found']);
          return of(undefined); // Return an observable with undefined value
        })
      )
      .subscribe((p) => {
        this.product = p;
      });
  }
}
