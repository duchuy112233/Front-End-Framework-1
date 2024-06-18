import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/Product';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  //////////////////////////////

  product: Product | undefined = {} as Product;
  addForm: FormGroup = {} as FormGroup;
  productID!: string;
  /////////////////////////////
  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    //////////////
    private route: ActivatedRoute
  ) {
    this.addForm = this.fb.group({
      image: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      isShow: [false, Validators.required],
      category: ['', [Validators.required]],
    });
  }
  //////////////////////////////////////////////
  ngOnInit(): void {
    this.productID = this.route.snapshot.params['id'];
    console.log(this.productID);
    this.productService
      .detailProduct(this.productID)
      .pipe(
        catchError((error) => {
          console.error('Product not found', error);
          this.router.navigate(['/not-found']);
          return of(undefined);
        })
      )
      .subscribe((p) => {
        this.product = p;
        if (this.product) {
          this.addForm.patchValue(this.product);
        }
      });
  }
  ////////////////////////////////////////

  handleSubmit() {
    if (this.addForm.valid) {
      console.log(this.addForm.value);
      if (window.confirm('Cập nhật sản phẩm thành công')) { 
         this.productService
        .editProduct(this.addForm.value, this.productID)
        .subscribe(() => {
          this.router.navigate(['/'])
        });
      }
    
    }
  }
}
