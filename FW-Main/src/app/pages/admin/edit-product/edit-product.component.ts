import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Types/Product';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductService } from '../../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  product: Product | undefined = {} as Product;
  productForm: FormGroup;
  productID!: string;
/////////////////////////////////////////////////
  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      thumbnail: ['', [Validators.required, Validators.minLength(0)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      discountPercentage: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(1)]],
      rating: ['', [Validators.required, Validators.max(5), Validators.min(0)]],
      category: ['', [Validators.required, Validators.minLength(0)]],
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
          this.productForm.patchValue(this.product);
        }
      });
  }
  ////////////////////////////////////////
  deleteMessage: string | null = null;
  handleSubmit() {
    if (this.productForm.valid) {
      
      this.productService
        .updateProductById(this.productForm.value, this.productID)
        .subscribe((data) => {
          console.log('Update product successfully!', data);
          // alert('Xác nhận cập nhật sản phẩm thành công');
          // Hiển thị thông báo cập nhật sản phẩm thành công
          this.deleteMessage = 'Cập nhật sản phẩm thành công!';
          // Điều hướng về trang /admin sau 2 giây
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 2000);
        });
    }
  }



}
