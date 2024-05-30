import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Types/Product';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  product: Product = {} as Product;
  productForm: FormGroup = {} as FormGroup;
  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      thumbnail: ['', [Validators.required, Validators.minLength(0)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      discountPercentage: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(1)]],
      rating: ['', [Validators.required, Validators.max(5), Validators.min(0)]],
    });
  }
  deleteMessage: string | null = null;

  ngOnInit(): void {}

  handleSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productService
        .createProduct(this.productForm.value)
        .subscribe((data) => {
          console.log('Create product successfully!', data);
          alert('Xác nhận thêm sản phẩm thành công');

          // Hiển thị thông báo thêm sản phẩm thành công
          this.deleteMessage = 'Thêm sản phẩm thành công!';

          // Điều hướng về trang /admin sau 2 giây
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 2000);
        });
    }
  }
}
