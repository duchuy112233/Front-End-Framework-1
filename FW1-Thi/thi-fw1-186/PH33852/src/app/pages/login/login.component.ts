import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  constructor(private router: Router) {}

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
  });

  handleSubmit() {
    if (window.confirm('dang ky thanh cong -login')) {
      this.authService.login(this.registerForm.value).subscribe({
        next: (data) => {
          localStorage.setItem(
            'token',
            (data as { accessToken: string }).accessToken
          );
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error.message);
        },
      });
    }
  }
}
