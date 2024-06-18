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
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent {
  product: Product | undefined = {} as Product;
  addForm: FormGroup = {} as FormGroup;
  PrdID!: string;
  constructor(
    private productSevi: AdminService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.addForm = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(3)] ],
      show: [false, Validators.required],
      category: ['',[Validators.required] ],
    });
  }
  ngOnInit(): void {
    this.PrdID = this.route.snapshot.params['id'];
    this.productSevi
      .ByIDPrd(this.PrdID)
      .pipe(  
        catchError(() => {
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

  HandleSubmit() {
    if (this.addForm.valid) {
      console.log(this.addForm.valid);
      if (window.confirm('Xoá sản phẩm thành công')) {
        this.productSevi.editPrd(this.addForm.value , this.PrdID).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
