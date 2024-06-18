import { Component, inject } from '@angular/core';
import { Product } from '../../types/Product';
import { ProductService } from '../../product.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


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
      title: ['', [Validators.required, Validators.minLength(3)]],
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
