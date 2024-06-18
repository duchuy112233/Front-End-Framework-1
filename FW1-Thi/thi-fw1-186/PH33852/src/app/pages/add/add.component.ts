import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../types/Product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  products: Product = {} as Product;
  addForm: FormGroup = {} as FormGroup;
  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.required]],
      image: ['', [Validators.required]],
      quantity: ['', [Validators.min(0), Validators.required]],
      active: [false, Validators.required],
    });
  }
  ngOnInit() {}
  handleSubmit() {
    if (this.addForm.valid) {
      console.log(this.addForm.valid);
      if (window.confirm('them thanh cong')) {
        this.productService.addProduct(this.addForm.value).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
