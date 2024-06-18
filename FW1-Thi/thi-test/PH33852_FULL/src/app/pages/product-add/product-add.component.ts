import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../types/product';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],

  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  product: Product = {} as Product;
  addForm: FormGroup = {} as FormGroup;
  constructor(
    private productSevi: AdminService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      show: [false, Validators.required],
      category: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}
  HandleSubmit() {
    if (this.addForm.valid) {
      console.log(this.addForm.valid);
      if (window.confirm('Xoá sản phẩm thành công')) {
        this.productSevi.addtPrd(this.addForm.value).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
