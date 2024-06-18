import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../types/Product';
import { ProductService } from '../../product.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  products: Product | undefined = {} as Product;
  addForm: FormGroup = {} as FormGroup;
  productID!: string;
  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.addForm = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.required]],
      image: ['', [Validators.required]],
      quantity: ['', [Validators.min(0), Validators.required]],
      active: [false, Validators.required],
    });
  }
  ngOnInit(): void {
    this.productID = this.route.snapshot.params['id'];
    this.productService
      .ByIdProduct(this.productID)
      .pipe(
        catchError(() => {
          this.router.navigate(['/not-found']);
          return of(undefined);
        })
      )
      .subscribe((p) => {
        this.products = p;
        if (this.products) {
          this.addForm.patchValue(this.products);
        }
      });
  }
  handleSubmit() {
    if (this.addForm.valid) {
      console.log(this.addForm.valid);
      if (window.confirm('cap nhat thanh cong')) {
        this.productService
          .editProduct(this.addForm.value, this.productID)
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      }
    }
  }
}
