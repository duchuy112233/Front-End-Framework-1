import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../types/Product';
import { ProductService } from '../../product.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  ProID!: string;
  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.ProID = this.route.snapshot.params['id'];
    this.productService
      .ByIdProduct(this.ProID)
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
      if (window.confirm('them thanh cong')) {
        this.productService
          .editProduct(this.addForm.value, this.ProID)
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      }
    }
  }
}
